// Tweets de ejemplo
const tweets = [
  {
    username: "manuel",
    content: "Mi primer Tweet.",
    like: false,
    date: "10 jun.",
    id: "1"
  },
  {
    username: "pablo",
    content: "Mi primer Tweet.",
    like: true,
    date: "11 jun.",
    id: "2"
  },

  {
    username: "francisco",
    content: "Que fuerte el partido de hoy",
    like: false,
    date: "15 dic.",
    id: "3"
  }
];

// Definimos los tipos
export const typeDefs =`
  type Tweet {
    id: ID!
    username: String!
    content: String!
    date: String!
    like: Boolean!
  }

  type Query {
    allTweets: [Tweet]!
    findTweetUser(username: String!): Tweet
  }

  type Mutations{
    addTweet(
      username: String!
      content: String!
      date: String!
      like: Boolean!
    ): Tweet
  }
`;

// Definimos los resolvers
export const resolvers = {
  Query: {
    allTweets: () => tweets,

    findTweetUser: (root, args)=> {
    const {username} = args
    return tweets.find(tweet => tweet.username == username)
    }
  },

  Mutation: {
    addTweet: (root, arg)=> {
      const tweet = {...arg, id: uuid()}
    }
  }

}
