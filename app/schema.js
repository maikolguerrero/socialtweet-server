// Tweets de ejemplo
import {v1 as uuid} from "uuid";
import { UserInputError } from 'apollo-server-errors';

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

  type Mutation{
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
  //Querys (listar todos los tweets, ifo de un solo tweet)
  Query: {
    allTweets: () => tweets,

    findTweetUser: (root, args)=> {
    const {username} = args
    return tweets.find(tweet => tweet.username == username)
    }
  },

  // Mutaciones (añadir tweet)
  Mutation: {
    addTweet: (root, arg)=> {
      //Realizamos la comprobación para q no se repita un usuario
      if(tweets.find (t => t.username == arg.username && t.content == arg.content )){
        throw new UserInputError ("Este usuario ya ah publicado este tweet", {
          invalidArgs: arg.content
        })
      }
      // Obtenemos los valores de los arg
      const tweet = {...arg, id: uuid()}
      tweets.push(tweet) // faltaria actualizar la base de datos
      return tweet
    }
  }
}
