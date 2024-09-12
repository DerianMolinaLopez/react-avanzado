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