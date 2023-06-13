import { v4 } from 'uuid'

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

  type Mutation {
    addTweet(
      username: String!
      content: String!
      date: String!
      like: Boolean!
    ): Tweet,
    addFavorito(
      id: ID!
      like: Boolean!
    ): Tweet,
    deleteTweet(
      id: ID!
    ): Tweet,
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
    allTweets: () => tweets
  },
  Mutation: {
    addTweet: (root, args) => {
      const tweet = {... args, id: v4()}
      tweets.push(tweet); // Actualizamos la base de datos
      return tweet
    },
    addFavorito: (root, args) => {
      const tweetIndex = tweets.findIndex(t => t.id === args.id)
      if (tweetIndex === -1) return null;

      const tweet = tweets[tweetIndex]

      const updatedTweet = {...tweet, like: args.like}
      tweets[tweetIndex] = updatedTweet

      return updatedTweet
    },
    deleteTweet: (root, args) => {
      const tweetIndex = tweets.findIndex(t => t.id === args.id)
      if (tweetIndex === -1) return null;

      const tweet = tweets[tweetIndex]
      tweets.splice(tweetIndex, 1);

      return tweet
    },
    editTweet: (root, args) => {
      const tweetIndex = tweets.findIndex(t => t.id === args.id)
      if (tweetIndex === -1) return null;

      const tweet = tweets[tweetIndex]

      const updatedTweet = {...tweet, content: args.content}
      tweets[tweetIndex] = updatedTweet

      return updatedTweet
    }
  }
};
