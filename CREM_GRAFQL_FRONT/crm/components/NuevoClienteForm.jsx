"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from 'react-toastify';
import { nuevoCliente } from "@/queries";
import { useMutation } from "@apollo/client";
import { obtenerClientesUsuario } from "@/queries";
const NuevoClienteForm = () => {
  const [crearCliente] = useMutation(nuevoCliente,{
    //cuando se ejecute la mutacion actualzamos el cacheque tenemos para refrecar la lista de los clientes
    //aunque la otras pestaña se actualiza si o si, lo hago para prevenir algun error que pueda surgir
    update(cache, { data: { crearCliente } }) {
      //obtenemos el objeto de cache que queremos actualizar
      const {obtenerClientesVendedor} = cache.readQuery({ query: obtenerClientesUsuario });
      cache.writeQuery({
        query: obtenerClientesUsuario,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, crearCliente]
        }
      })
    }
  });
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      contacto: "",
      email: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      const { data: cliente } = await crearCliente({
        variables: {
          input: {
            nombre: data.nombre,
            apellido: data.apellido,
            empresa: data.empresa,
            contacto: data.contacto,
            email: data.email
          }
        }
      });

      if (cliente) {
        toast.success(`El cliente ${cliente.crearCliente.nombre} ha sido creado correctamente`);
        // Limpiar los inputs después de 1.5 segundos
        setTimeout(() => {
          reset();
        }, 1500);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onError = (errors) => {
    Object.values(errors).forEach(error => {
      toast.error(error.message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}
      className="w-96 bg-white rounded-lg shadow-xl p-8 mt-20">
      <h2 className="text-3xl font-semibold text-center">Nuevo Cliente</h2>
      <input
        {...register("nombre", { required: "El nombre es obligatorio" })}
        type="text"
        placeholder="Nombre"
        className="w-full border-2 border-gray-300 rounded-lg p-2 mt-4"
      />
      <input
        {...register("apellido", { required: "El apellido es obligatorio" })}
        type="text"
        placeholder="Apellido"
        className="w-full border-2 border-gray-300 rounded-lg p-2 mt-4"
      />
      <input
        {...register("empresa", { required: "La empresa es obligatoria" })}
        type="text"
        placeholder="Empresa"
        className="w-full border-2 border-gray-300 rounded-lg p-2 mt-4"
      />
      <input
        {...register("contacto", { required: "El contacto es obligatorio" })}
        type="text"
        placeholder="Contacto"
        className="w-full border-2 border-gray-300 rounded-lg p-2 mt-4"
      />
      <input
        {...register("email", { required: "El correo electrónico es obligatorio" })}
        type="email"
        placeholder="Correo Electrónico"
        className="w-full border-2 border-gray-300 rounded-lg p-2 mt-4"
      />
      <button
        type="submit"
        className="w-full bg-emerald-500 hover:bg-emerald-700 transition-colors duration-200 text-white rounded-lg p-2 mt-4"
      >
        Crear nuevo cliente
      </button>
    </form>
  );
};

export default NuevoClienteForm;