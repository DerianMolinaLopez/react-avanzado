import { gql } from "apollo-server"
//esquema
const typeDefs = gql`
  type Usuario{
        id:ID
        nombre:String
        apellido:String
        email:String
        password:String
        createAt:String
  }
  type Token{
    token:String
  }
  input UsuarioInput{
        nombre:String!
        apellido:String!
        email:String!
        password:String!
  }
  input AutenticarInput{
    email:String!
    password:String!
  }
  type Mutation {
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input:AutenticarInput): Token
  }
   type Query{
      obtenerUsuario(token:String!):Usuario
       
   }
`//-->cuidado con los corchetes, respetar la sintaxis de arreglo
export {typeDefs}