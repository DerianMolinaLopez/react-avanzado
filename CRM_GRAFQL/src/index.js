import { ApolloServer } from "apollo-server"
import dotenv from "dotenv"
import { resolvers } from "./resolver/resolver.js"
import moongose from 'mongoose';
import { typeDefs } from "./types/typeDefs.js"
import decodificarToken from "./utils/decodificarJWT.js";
import connectDB   from "./config/databse.js"


dotenv.config()
//servidor 
connectDB()
const server = new ApolloServer({typeDefs
                               ,resolvers,
                               context:({req})=>{
                               
                                //la cadena de atorizacion es reservdado para procesar el token
                                let token = req.headers['authorization'] || ""
                               
                                if(token!==""){
                                    if(token.includes('Bearer')){
                                    token = token.split(' ')[1]
                                    }
                                    console.log(token)
                                    const usuario = decodificarToken(token) 
                                    return {usuario}
                                }
                                return {usuario:null}
                               } 
                            })

server.listen().then(({url})=>{
    console.log("servidor corriendo"+url)
})