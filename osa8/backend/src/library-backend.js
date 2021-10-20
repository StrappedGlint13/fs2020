const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
require('dotenv').config()
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})


const { v1: uuid } = require('uuid')
const book = require('./models/book')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }

  type Book {
    title: String!
    published: String!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find( { genres: { $in: args.genre } })
      }

    return Book.find({})
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      return Book.find( { author: { $in: root._id } } ).countDocuments()
    },
  },

  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      console.log(currentUser)
      
      if (!currentUser) {      
        throw new AuthenticationError("not authenticated")    
      }
      
      const author = await Author.findOne({ name: args.name })
      if (author === null) {
        return null
      }
      author.born = args.setBornTo  
      try {
        return await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }, 
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {      
        throw new AuthenticationError("not authenticated")    
      }
      
      const isAuthor = await Author.findOne({ name: args.author }) 
      
      if (isAuthor === null) {
        const author = new Author({
          name: args.author,
          born: null,
        })
        try {
          await author.save()
          const book = new Book({ ...args, author: author })
          return await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
       
      }
      const book = new Book({ ...args, author: isAuthor })
      try {
        return book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ ...args })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(user)
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {    
    const auth = req ? req.headers.authorization : null    
    if (auth && auth.toLowerCase().startsWith('bearer ')) {      
      const decodedToken = jwt.verify(        
        auth.substring(7), JWT_SECRET      
      )      
      const currentUser = await User        
      .findById(decodedToken.id)
      console.log({ currentUser })

      return { currentUser }    
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})