// Tweets de ejemplo
const tweets = [
  {
    username: "usuario1",
    content: "Mi primer Tweet.",
    like: false,
    date: "10 jun.",
    id: "1"
  },
  {
    username: "usuario2",
    content: "Mi primer Tweet.",
    like: true,
    date: "11 jun.",
    id: "2"
  }
];

// Definimos los tipos
export const typeDefs = `
  type Tweet {
    id: ID!
    username: String!
    content: String!
    date: String!
    like: Boolean!
  }

  type Query {
    allTweets: [Tweet]!
  }
`;

// Definimos los resolvers
export const resolvers = {
  Query: {
    allTweets: () => tweets
  }
};
