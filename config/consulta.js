import { pool } from './connection.js';

// Función para realizar consultas a la BD
async function realizarConsulta(sql, values) {
  try {
    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (error) {
    console.log(`Hubo un error: ${error}`);
    throw error;
  }
}

export default realizarConsulta;