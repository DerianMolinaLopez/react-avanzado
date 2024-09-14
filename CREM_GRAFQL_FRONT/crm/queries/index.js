import {gql} from "@apollo/client";
export const  queryProductos = gql`
    {
    obtenerProductos {
    nombre
    existencia
    createAt
  }
}
`
export const  nuevoUsuario = gql`
    mutation nuevoUsuario($input:UsuarioInput){
    nuevoUsuario(input: $input){
    id
    nombre
    apellido
    email
  }
}
`
export const autenticarUsuario = gql`
   mutation autenticarUsuario ($input:AutenticarInput){
    autenticarUsuario(input:$input) {
    token
  }
}
`
export const obtenerClientesUsuario = gql`
 {
  obtenerClientesByVendedor {
  id
  nombre
  email
  empresa
 }
 }
` 
export const obtenerUsuario = gql`
  query ($token: String!) {
  obtenerUsuario(token: $token) {
    id
    nombre
    apellido
  }
}
`;

export const nuevoCliente = gql`
mutation crearCliente($input: ClienteInput){
  crearCliente(input: $input) {
    nombre
    vendedor
    
  }
}
`