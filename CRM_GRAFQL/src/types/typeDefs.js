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
  type Cliente{
    id:ID
    nombre:String
    apellido:String
    empresa:String
    contacto:String
    email:String
    creado:String
    vendedor:ID
  }
  input UsuarioInput{
        nombre:String!
        apellido:String!
        email:String!
        password:String!
  }
  type Pedido{
    id:ID
    pedido:[PedidoGrupo]
    total:Float
    cliente:Cliente
    vendedor:Usuario
    estado:EstadoPedido
    fecha:String
  }
  type PedidoGrupo{
    id:ID
    cantidad:Int
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
  input ClienteInput{
    nombre:String!
    apellido:String!
    empresa:String!
    contacto:String!
    email:String!
  } 
  enum EstadoPedido{
    PENDIENTE
    COMPLETADO
    CANCELADO
  }
  
  input PedidoProductoInput{
    id:ID
    cantidad:Int
  }
  input PedidoInput{
    total:Float!
    cliente:ID!
    estado:EstadoPedido
    pedido:[PedidoProductoInput]
  }
  type Mutation {
    nuevoUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input:AutenticarInput): Token
    crearProducto(input:ProductoInput): Producto
    actualizarProducto(id:String!,input:ActualizarProductoInput):Producto
    eliminarProducto(id:ID!):String
    crearCliente(input:ClienteInput):Cliente
    actualizarCliente(id:ID!,input:ClienteInput):Cliente
    eliminarCliente(id:ID!):String
    nuevoPedido(input:PedidoInput):Pedido
  }
   type Query{
      obtenerUsuario(token:String!):Usuario
      obtenerProductos:[Producto]
      obtenerProducto(id:ID!):Producto
      obtenerClientes:[Cliente]
      obtenerClientesByVendedor:[Cliente]
      obtenerCliente(id:ID!):Cliente
       
   }
`//-->cuidado con los corchetes, respetar la sintaxis de arreglo
export {typeDefs}