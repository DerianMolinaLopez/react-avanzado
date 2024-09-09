import { cursos } from "../data/Cursos.js"
import moongose from 'mongoose';
import Usuario from "../models/Usuario.js"
import generarToken from "../config/generateToken.js";
import bcrypt from "bcrypt"
import Producto from "../models/Producto.js";
import jwt from 'jsonwebtoken';
import Cliente from "../models/Clientes.js";
import decodificarToken from "../utils/decodificarJWT.js";
//resolvers
export const resolvers = {
    Query:{
      obtenerUsuario: async(_,{token})=>{
        try{
          const usuario = jwt.verify(token,process.env.SECRETA)
          console.log()
          if(typeof usuario === "object"){
            const {email} = usuario
            const usuarioExist = await Usuario.findOne({email}).select("-password")
            if(!usuarioExist){
              throw new Error("Usuario no existe")
            }
            return usuarioExist
          }
          return "hola mundo"
        }catch(error){
          console.log(error)
        }
      },
      obtenerProductos: async()=>{
        try{
          const productos = await Producto.find()
          return productos
        }catch(error){
          console.log(error)
      }
    },
    obtenerProducto : async(_,{id})=>{
      console.log(id)
      const prodcutoExist = await Producto.findById(id)
      if(!prodcutoExist) throw new Error("El producto no existe")
      return prodcutoExist
    
    },
    obtenerClientes: async(_,{},{usuario})=>{
      console.log(usuario)
      const clientes = await Cliente.find({vendedor:usuario.id})
      return clientes
    },
    obtenerClientesByVendedor: async(_,{},{usuario})=>{
      const clientes = await Cliente.find({vendedor:usuario.id})
      return clientes
    },
    obtenerCliente: async(_,{id},)=>{
      console.log(id)
      const cliente = await Cliente.findById(id)
      if(!cliente) throw new Error("El cliente no existe")
        console.log(cliente)
      return cliente
    }
    

    },
    Mutation:{
      nuevoUsuario: async(_,{input}) => {
        let {nombre,apellido,email,password} = input
        const usuarioExist =await Usuario.findOne({email})
        console.log(usuarioExist)
        if(usuarioExist){
          throw new Error("El usuario ya esta registrado")
        }
        try{
          password = await bcrypt.hash(password,10)
          const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            email,
            password
          })
          await nuevoUsuario.save()
  
          
          return nuevoUsuario

        }catch(error){
          console.lgo(error)
          return error.message
        }
     
      },
      autenticarUsuario : async(_,{input})=>{
        const {email,password} = input
        const usuarioExist = await Usuario.findOne({email})
        if(!usuarioExist){
          throw new Error("El usuario no existe")
        }
        const passwordCorrect = await bcrypt.compare(password,usuarioExist.password)
        if(!passwordCorrect){
          throw new Error("Password incorrecto")
        }
        //console.log(generarToken(usuarioExist.id,usuarioExist.email))
        const token = generarToken(usuarioExist.id,usuarioExist.email)
        console.log(token)
        return {
          token
        }
      },
      crearProducto: async(_,{input})=>{
        console.log(input)
        const {nombre} = input
        const productoExist = await Producto.findOne({nombre})
        if(productoExist){
          throw new Error("El producto ya existe")
        }
        const nuevoProducto = new Producto(input)
        await nuevoProducto.save()
        
        return nuevoProducto
      },
      actualizarProducto: async(_,{id,input})=>{
        const prodcutExist = await Producto.findById(id)
        if(!prodcutExist) throw new Error("El producto no existe")
        const producto = await Producto.findByIdAndUpdate(id,input,{new:true})
        return producto
      },
      eliminarProducto: async(_,{id})=>{
        const productoExist = await Producto.findById(id)
        if(!productoExist) throw new Error("El producto no existe")
        await Producto.findByIdAndDelete(id)
        return "Producto eliminado"
      },
      crearCliente: async(_,{input},context)=>{
        const {email} = input
        const {usuario} = context
        const clienteExiste = await Cliente.findOne({email})
        if(clienteExiste) throw new Error("El cliente ya esta registrado")
          //asignamos el vendedor que esta contenido en el context
        const cliente = new Cliente({...input,vendedor:usuario.id})
           
        await cliente.save()
        return cliente
      },
      actualizarCliente: async(_,{id,input},context)=>{
        //verificamos si su vendedor es quien esta esditando
        const{email,...inputIgnorado} = input//ignoramos el objeto email apra evitar la duplicidad
        const{usuario} = context
        const cliente = await Cliente.findById(id)
        if(!cliente) throw new Error("El cliente no existe")
        if(cliente.vendedor.toString() !== usuario.id) throw new Error("No tienes las credenciales para editar")
        const clienteUpdate = await Cliente.findByIdAndUpdate(id,inputIgnorado,{new:true})  
        return clienteUpdate
      },
      eliminarCliente: async(_,{id},context)=>{

        const {usuario} = context
        console.log(id)
        console.log(usuario)
        const cliente = await Cliente.findById(id)
        if(!cliente) throw new Error("El cliente no existe")
        if(cliente.vendedor.toString() !== usuario.id) throw new Error("No tienes las credenciales para editar")
        await Cliente.findByIdAndDelete(id)
        return "Cliente eliminado"
      } 
      
    }
}