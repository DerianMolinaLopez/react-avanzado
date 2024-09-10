import { cursos } from "../data/Cursos.js";
import moongose from "mongoose";
import Usuario from "../models/Usuario.js";
import generarToken from "../config/generateToken.js";
import bcrypt from "bcrypt";
import Producto from "../models/Producto.js";
import jwt from "jsonwebtoken";
import Cliente from "../models/Clientes.js";
import Pedido from "../models/Pedido.js";
//resolvers
export const resolvers = {
  Query: {
    obtenerUsuario: async (_, { token }) => {
      try {
        const usuario = jwt.verify(token, process.env.SECRETA);
        console.log();
        if (typeof usuario === "object") {
          const { email } = usuario;
          const usuarioExist = await Usuario.findOne({ email }).select(
            "-password"
          );
          if (!usuarioExist) {
            throw new Error("Usuario no existe");
          }
          return usuarioExist;
        }
        return "hola mundo";
      } catch (error) {
        console.log(error);
      }
    },
    obtenerProductos: async () => {
      try {
        const productos = await Producto.find();
        return productos;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerProducto: async (_, { id }) => {
      console.log(id);
      const prodcutoExist = await Producto.findById(id);
      if (!prodcutoExist) throw new Error("El producto no existe");
      return prodcutoExist;
    },
    obtenerClientes: async (_, {}) => {
      const clientes = await Cliente.find();
      return clientes;
    },
    obtenerClientesByVendedor: async (_, {}, { usuario }) => {
      const clientes = await Cliente.find({ vendedor: usuario.id });
      return clientes;
    },
    obtenerCliente: async (_, { id }) => {
      console.log(id);
      const cliente = await Cliente.findById(id);
      if (!cliente) throw new Error("El cliente no existe");
      console.log(cliente);
      return cliente;
    },
    obtenerPedidos: async (_, {}) => {
      const pedidos = await Pedido.find()
        .populate({ path: "cliente" })
        .populate({ path: "vendedor" });
      //   .populate({path:"pedido.id" ,select:"nombre"})
      return pedidos;
    },
    obtenerPedidosByVendedor: async (_, {}, { usuario }) => {
      const pedidos = await Pedido.find({ vendedor: usuario.id })
        .populate({ path: "cliente" })
        .populate({ path: "vendedor" });
      return pedidos;
    },
    obtenerPedidosByID: async (_, { id }) => {
      const pedido = await Pedido.findById(id)
        .populate({ path: "cliente" })
        .populate({ path: "vendedor" });
      return pedido;
    },
    obtenerPedidosByEstado: async (_, { estado }, { usuario }) => {
      const pedidos = await Pedido.find({ vendedor: usuario.id, estado });
      return pedidos;
    }
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      let { nombre, apellido, email, password } = input;
      const usuarioExist = await Usuario.findOne({ email });
      console.log(usuarioExist);
      if (usuarioExist) {
        throw new Error("El usuario ya esta registrado");
      }
      try {
        password = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuario({
          nombre,
          apellido,
          email,
          password,
        });
        await nuevoUsuario.save();

        return nuevoUsuario;
      } catch (error) {
        console.lgo(error);
        return error.message;
      }
    },
    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;
      const usuarioExist = await Usuario.findOne({ email });
      if (!usuarioExist) {
        throw new Error("El usuario no existe");
      }
      const passwordCorrect = await bcrypt.compare(
        password,
        usuarioExist.password
      );
      if (!passwordCorrect) {
        throw new Error("Password incorrecto");
      }
      //console.log(generarToken(usuarioExist.id,usuarioExist.email))
      const token = generarToken(usuarioExist.id, usuarioExist.email);
      console.log(token);
      return {
        token,
      };
    },
    crearProducto: async (_, { input }) => {
      console.log(input);
      const { nombre } = input;
      const productoExist = await Producto.findOne({ nombre });
      if (productoExist) {
        throw new Error("El producto ya existe");
      }
      const nuevoProducto = new Producto(input);
      await nuevoProducto.save();

      return nuevoProducto;
    },
    actualizarProducto: async (_, { id, input }) => {
      const prodcutExist = await Producto.findById(id);
      if (!prodcutExist) throw new Error("El producto no existe");
      const producto = await Producto.findByIdAndUpdate(id, input, {
        new: true,
      });
      return producto;
    },
    eliminarProducto: async (_, { id }) => {
      const productoExist = await Producto.findById(id);
      if (!productoExist) throw new Error("El producto no existe");
      await Producto.findByIdAndDelete(id);
      return "Producto eliminado";
    },
    crearCliente: async (_, { input }, context) => {
      const { email } = input;
      const { usuario } = context;
      const clienteExiste = await Cliente.findOne({ email });
      if (clienteExiste) throw new Error("El cliente ya esta registrado");
      //asignamos el vendedor que esta contenido en el context
      const cliente = new Cliente({ ...input, vendedor: usuario.id });

      await cliente.save();
      return cliente;
    },
    actualizarCliente: async (_, { id, input }, context) => {
      //verificamos si su vendedor es quien esta esditando
      const { email, ...inputIgnorado } = input; //ignoramos el objeto email apra evitar la duplicidad
      const { usuario } = context;
      const cliente = await Cliente.findById(id);
      if (!cliente) throw new Error("El cliente no existe");
      if (cliente.vendedor.toString() !== usuario.id)
        throw new Error("No tienes las credenciales para editar");
      const clienteUpdate = await Cliente.findByIdAndUpdate(id, inputIgnorado, {
        new: true,
      });
      return clienteUpdate;
    },
    eliminarCliente: async (_, { id }, context) => {
      const { usuario } = context;
      console.log(id);
      console.log(usuario);
      const cliente = await Cliente.findById(id);
      if (!cliente) throw new Error("El cliente no existe");
      if (cliente.vendedor.toString() !== usuario.id)
        throw new Error("No tienes las credenciales para editar");
      await Cliente.findByIdAndDelete(id);
      return "Cliente eliminado";
    },
    nuevoPedido: async (_, { input }, context) => {
      const { usuario } = context;
      const { cliente, pedido } = input;

      const clienteexist = await Cliente.findById(cliente);
      if (!clienteexist) throw new Error("El cliente no existe");
      //verificar si el cliente es del vendedeor
      if (clienteexist.vendedor.toString() !== usuario.id)
        throw new Error("No tienes las credenciales para editar");

      //verifico el stock disponible por cada uno
      for (const pedidoaux of pedido) {
        const pedidoBuscado = await Producto.findById(pedidoaux.id);
        if (pedidoBuscado.existencia < pedidoaux.cantidad) {
          throw new Error(
            `El producto ${pedidoBuscado.nombre} excede la cantidad disponible`
          );
        }
        pedidoBuscado.existencia = pedidoBuscado.existencia - pedidoaux.cantidad;
        await pedidoBuscado.save()
      }
      //asignar un vendedor al pedido
      const pedidoNuevo = new Pedido({ ...input, vendedor: usuario.id });
      //guardar todo en la base de datos
      await pedidoNuevo.save();
      return pedidoNuevo;
    },
        actualizarPedido: async (_, { input, id }, context) => {
      const { cliente, total, pedido } = input;
    
      // Verificar la existencia del pedido y del cliente
      const pedidoExist = await Pedido.findById(id);
      const clienteExist = await Cliente.findById(cliente);
      if (!pedidoExist) throw new Error("El pedido no existe");
      if (!clienteExist) throw new Error("El cliente no existe");
    
      // Verificar las credenciales del usuario
      if (
        pedidoExist.vendedor.toString() !== context.usuario.id &&
        clienteExist.vendedor.toString() !== context.usuario.id
      ) {
        throw new Error("No tienes las credenciales para editar");
      }
    
      // Verificar y actualizar el stock de los productos
      if (pedido) {
        for (const pedidoAux of pedido) {
          const producto = await Producto.findById(pedidoAux.id);
          if (!producto) throw new Error(`El producto con ID ${pedidoAux.id} no existe`);
    
          const cantidadAnterior = pedidoExist.pedido.find(p => p.id.toString() === pedidoAux.id.toString()).cantidad;
          const cantidadActualizada = pedidoAux.cantidad;
          const diferenciaCantidad = cantidadActualizada - cantidadAnterior;
    
          if (producto.existencia < diferenciaCantidad) {
            throw new Error(`El producto ${producto.nombre} excede la cantidad disponible`);
          }
    
          producto.existencia -= diferenciaCantidad;
          await producto.save();
        }
      }
    
      // Actualizar el pedido
      const pedidoActualizado = await Pedido.findByIdAndUpdate(id, input, { new: true });
      return pedidoActualizado;
    },
    eliminarPedido : async (_, { id }, context) => {
      const pedido = await Pedido.findById(id);

      if (!pedido) throw new Error("El pedido no existe");
    
      if (pedido.vendedor.toString() !== context.usuario.id) {
        throw new Error("No tienes las credenciales para editar");
      }
    
      await Pedido.findByIdAndDelete(id);
      return "Pedido eliminado";
    }
   
  },
};
