import { ApolloServer } from "apollo-server"
import dotenv from "dotenv"
import { resolvers } from "./resolver/resolver.js"
import moongose from 'mongoose';
import { typeDefs } from "./types/typeDefs.js"
import connectDB   from "./config/databse.js"


dotenv.config()
//servidor 
connectDB()
const server = new ApolloServer({typeDefs,resolvers})

server.listen().then(({url})=>{
    console.log("servidor corriendo"+url)
})