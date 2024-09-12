
"use client"
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const onError = (errors) => {
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.password) {
      toast.error(errors.password.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="w-80 bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-semibold text-center">Iniciar Sesión</h2>
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
          ¿No tienes una cuenta? <a href="/cuenta-nueva" className="text-emerald-500">Regístrate</a>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;