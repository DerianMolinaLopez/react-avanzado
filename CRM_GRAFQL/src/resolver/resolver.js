import { cursos } from "../data/Cursos.js"
import moongose from 'mongoose';
import Usuario from "../models/Usuario.js"
import generarToken from "../config/generateToken.js";
import bcrypt from "bcrypt"
import Producto from "../models/Producto.js";
import jwt from 'jsonwebtoken';
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
      }
      
    }
}