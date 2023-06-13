import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './schema.js';
import { validateConnection } from '../config/connection.js';

const PORT = process.env.PORT || 3000;

// Función para arrancar el servidor con ApolloServer
export default async function startServer() {

  // Colocamos los types y resolvers en el servidor
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Iniciamos el servidor con el PORT obtenido
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`Servidor listo en: ${url}`);

  validateConnection();
}