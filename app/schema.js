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
    findTweetUser(username: String!): Tweet
    allTweets (like: Boolean): [Tweet]!
  }

  type Mutation{
    addTweet(
      username: String!
      content: String!
      date: String!
      like: Boolean!
    ): Tweet

    editTweet(
      username: String!
      content: String!
      date: String!
      like: Boolean!
    ): Tweet

    deleteTweet(
      username: String!
    ): Tweet
  }
`;

// Definimos los resolvers
export const resolvers = {
  //Querys (listar todos los tweets, info de un solo tweet)
  Query: {
    allTweets: (root, arg) => {
      if (arg.like === undefined) return tweets
      const bylike = tweet =>
        arg.like == true ? tweet.like : !tweet.like  
    
      return tweets.filter(bylike)
    },

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
    },

    editTweet: (root, arg)=> {
      const { username } = arg;
      // Buscamos el tweet por su indice y comparando el username
      const tweetIndex = tweets.findIndex(t => t.username == username)
      // Verificamos que exista
      if (tweetIndex == -1) {throw new Error("No se encontró el tweet que se quiere editar")}
        const tweet = tweets[tweetIndex]
        // MOdificamos el tweet
        const ubdateTweet = {...tweet, content: arg.content, date: arg.date, like: arg.like}
        // Remplazamos los valores modificados en el punto que corresponde del array original
        tweets[tweetIndex] = ubdateTweet
        return ubdateTweet
    },


  }
}
