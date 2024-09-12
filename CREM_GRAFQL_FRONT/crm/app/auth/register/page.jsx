"use client"
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryProductos ,nuevoUsuario} from "@/queries";
import { useQuery,useMutation } from "@apollo/client";
const Page = () => {//!error en 

  const { data, loading, error } = useQuery(queryProductos);
  const [nuevoUsuario] = useMutation(nuevoUsuario);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
    }
  });

  const submit =async (data) => {
    try{
      await nuevoUsuario({
        variables:{
          input:{
            nombre:data.name,
            apellido:data.lastName,
            email:data.email,
            password:data.password
          }
        }
      })
    }catch(error){
      console.log("error",error);
    }
  };

  const onError = () => {
    if (errors.name) {
      toast.error(errors.name.message);
    }
    if (errors.lastName) {
      toast.error(errors.lastName.message);
    }
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.password) {
      toast.error(errors.password.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit, onError)} className="flex justify-center">
      <div className="w-1/2 bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center">Crear Nueva cuenta</h2>
        <input
          {...register("name", { required: "El nombre es obligatorio" })}
          type="text"
          placeholder="Nombre de usuario"
          className="w-full border-2 border-gray-300 rounded-lg p-2 mt-4"
        />
        <input
          {...register("lastName", { required: "Los apellidos son obligatorios" })}
          type="text"
          placeholder="Apellidos del usuario"
          className="w-full border-2 border-gray-300 rounded-lg p-2 mt-4"
        />
        <input
          {...register("email", { required: "El correo electrónico es obligatorio" })}
          type="email"
          placeholder="Correo Electrónico"
          className="w-full border-2 border-gray-300 rounded-lg p-2 mt-4"
        />
        <input
          {...register("password", { required: "La contraseña es obligatoria" })}
          type="password"
          placeholder="Contraseña"
          className="w-full border-2 border-gray-300 rounded-lg p-2 mt-4"
        />
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-700 transition-colors duration-200 text-white rounded-lg p-2 mt-4"
        >
          Iniciar Sesión
        </button>
        <p className="text-center mt-4">
          ¿No tienes una cuenta? <a href="/cuenta-nueva" className="text-blue-500">Regístrate</a>
        </p>
      </div>
    </form>
  );
};

export default Page;