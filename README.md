# socialtweet-server
Servidor GraphQL para almacenar y administrar tweets de usuarios en una aplicación CRUD. El cliente frontend que se complementa con este servidor se encuentra en este repositorio: [socialtweet-client](https://github.com/maikolguerrero/socialtweet-client)

## Características
- Creación, lectura, actualización y eliminación de tweets.
- Funcionalidad para marcar tweets como me gusta.
- Consulta de tweets con me gusta.
- Implementación de un esquema GraphQL para realizar las operaciones.

## Tecnologías utilizadas
- JavaScript
- Node.js
- GraphQL
- Apollo Server
- MySQL

## Instalación
1. Clona el repositorio: `git clone https://github.com/maikolguerrero/socialtweet-server.git`
2. Ingresa al directorio del proyecto: `cd socialtweet-server`
3. Instala las dependencias: `npm install`
4. Importa la base de datos MySQL.
5. Configura las variables de entorno en un archivo `.env`. Puedes basarte en el archivo `.env.example` proporcionado.

## Uso
1. Ejecuta la aplicación: `npm start`
2. Accede a la interfaz de GraphQL en tu navegador (con el puerto que le asignaste): `http://localhost:3000`
3. Utiliza las consultas y mutaciones definidas en el esquema para interactuar con los tweets.
