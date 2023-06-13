// Usamos dotenv para obtener las variables de entorno
import { config } from 'dotenv';

const result = config();

if (result.error) {
  throw result.error;
}