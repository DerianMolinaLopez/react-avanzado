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
        updateAt:String
  }
  type Producto{
    id:ID
    nombre:String
    existencia:Int
    precio:Float
    createAt:String
    updateAt:String
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
  input ProductoInput{
    nombre:String!
    existencia:Int!
    precio:Float!
  }
  input AutenticarInput{
    email:String!
    password:String!
  }
  input ActualizarProductoInput{
    nombre:String!
    existencia:Int!
    precio:Float!
  } 

  type Mutation {
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input:AutenticarInput): Token
    crearProducto(input:ProductoInput): Producto
    actualizarProducto(id:String!,input:ActualizarProductoInput):Producto
    eliminarProducto(id:ID!):String
  }
   type Query{
      obtenerUsuario(token:String!):Usuario
      obtenerProductos:[Producto]
      obtenerProducto(id:ID!):Producto
       
   }
`//-->cuidado con los corchetes, respetar la sintaxis de arreglo
export {typeDefs}