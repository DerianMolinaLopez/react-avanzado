import { gql } from "apollo-server"
//esquema
const typeDefs = gql`
  
   type Query{
       obtenerCursos: String
   }
`//-->cuidado con los corchetes, respetar la sintaxis de arreglo
export {typeDefs}