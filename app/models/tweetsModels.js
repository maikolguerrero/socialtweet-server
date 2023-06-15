import realizarConsulta from '../../config/consulta.js';

class TweetsModel {
  async getAll() {
    const sql = 'SELECT * FROM tweets';
    try {
      const tweets = await realizarConsulta(sql);
      return tweets;
    } catch (error) {
      console.log('Hubo un error al obtener los tweets: ', error);
      throw error;
    }
  }

  async getById(id) {
    const sql = 'SELECT * FROM tweets WHERE id = ?';
    const values = [id];
    try {
      const [tweet] = await realizarConsulta(sql, values);
      return tweet;
    } catch (error) {
      console.log(`Hubo un error al buscar el tweet con ID ${id}: `, error);
      throw error;
    }
  }

  async getLikedTweets() {
    const sql = 'SELECT * FROM tweets WHERE `like` = 1';
    try {
      const tweets = await realizarConsulta(sql);
      return tweets;
    } catch (error) {
      console.log('Hubo un error al obtener los tweets con me gusta: ', error);
      throw error;
    }
  }

  async add(username, content) {
    const sql = 'INSERT INTO tweets (username, content) VALUES (?, ?)';
    const values = [username, content];
    try {
      const result = await realizarConsulta(sql, values);
      const tweetId = result.insertId; // Obtener el ID del tweet creado
      const tweet = {
        id: tweetId,
        username,
        content,
        date: new Date().toISOString(),
        like: false
      };
      return tweet;
    } catch (error) {
      console.error('Error al crear el tweet en la base de datos: ', error);
      throw error;
    }
  }

  async addFavorito(id) {
    const tweet = await this.getById(id);
    if (!tweet) return null;

    const newLikeValue = tweet.like === 0 ? 1 : 0;
    const sql = 'UPDATE tweets SET `like` = ? WHERE id = ?';
    const values = [newLikeValue, id];

    try {
      await realizarConsulta(sql, values);
      const updatedTweet = { ...tweet, like: newLikeValue };
      return updatedTweet;
    } catch (error) {
      console.log(`Hubo un error al actualizar el tweet con ID ${id}: `, error);
      throw error;
    }
  }

  async delete(id) {
    const sql = 'DELETE FROM tweets WHERE id = ?';
    const values = [id];
    try {
      const resultado = await realizarConsulta(sql, values);
      if (resultado.affectedRows === 0) {
        return null; // Tweet no encontrado
      }
      return true; // Eliminación exitosa
    } catch (error) {
      console.log(`Hubo un error al eliminar el tweet con el ID ${id}: `, error);
      throw error;
    }
  }
  
  async searchTweets(searchTerm) {
    // Consulta al mysql
    const sql = 'SELECT * FROM tweets WHERE username LIKE ? OR content LIKE ?';
    const values = [`%${searchTerm}%`, `%${searchTerm}%`];
    try {
      // Retornando la info del tweet por el username
      const tweets = await realizarConsulta(sql, values);
      return tweets;
      // Manejo de errores
    }   catch (error) {
      console.log('Hubo un error al realizar la búsqueda de tweets: ', error);
      throw error;
    }
}

  async edit(id, content) {
    const sql = 'UPDATE tweets SET content = ? WHERE id = ?';
    const values = [content, id];
    try {
      await realizarConsulta(sql, values);
    } catch (error) {
      console.log(`Hubo un error al editar el tweet con el ID ${id}: `, error);
      throw error;
    }
  }
}

const tweetsModel = new TweetsModel();
export default tweetsModel;