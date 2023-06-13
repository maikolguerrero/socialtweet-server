import tweetsModel from './models/tweetsModels.js';

// Definimos los tipos
export const typeDefs = `#graphql
  type Tweet {
    id: ID!
    username: String!
    content: String!
    date: String!
    like: Boolean!
  }

  type Mutation {
    addTweet(
      username: String!
      content: String!
    ): Tweet,

    addFavorito(
      id: ID!
    ): Tweet,

    deleteTweet(
      id: ID!
    ): Boolean

    editTweet(
      id: ID!
      content: String!
    ): Tweet
  }

  type Query {
    allTweets: [Tweet]!
  }
`;

// Definimos los resolvers
export const resolvers = {
  Query: {
    allTweets: async () => {
      try {
        const tweets = await tweetsModel.getAll();
        return tweets;
      } catch (error) {
        console.log('Hubo un error al obtener los tweets: ', error);
        throw error;
      }
    }
  },

  Mutation: {
    addTweet: async (root, { username, content }) => {
      try {
        const tweet = await tweetsModel.add(username, content);
        return tweet;
      } catch (error) {
        console.error('Error al crear el tweet: ', error);
        throw error;
      }
    },

    addFavorito: async (root, { id }) => {
      try {
        const tweet = await tweetsModel.addFavorito(id);
        return tweet;
      } catch (error) {
        console.log('Hubo un error al añadir el favorito: ', error);
        throw error;
      }
    },

    deleteTweet: async (root, { id }) => {
      try {
        const deletedTweet = await tweetsModel.delete(id);
        if (!deletedTweet) {
          return false; // Tweet no encontrado
        }
        return true; // Tweet encontrado y eliminado con exito
      } catch (error) {
        console.log(`Hubo un error al eliminar el tweet con el ID ${id}: `, error);
        throw error;
      }
    },

    editTweet: async (root, { id, content }) => {
      try {
        await tweetsModel.edit(id, content);
        const tweet = await tweetsModel.getById(id);
        return tweet;
      } catch (error) {
        console.log(`Hubo un error al editar el tweet con el ID ${id}: `, error);
        throw error;
      }
    }
  }
};