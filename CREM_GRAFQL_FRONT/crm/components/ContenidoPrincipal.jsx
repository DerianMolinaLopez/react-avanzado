"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useQuery } from "@apollo/client";
import { obtenerUsuario } from "@/queries";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ContenidoPrincipal = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Obtener el token de localStorage solo en el lado del cliente
    const storedToken = localStorage.getItem("token");
    console.log(storedToken);
    setToken(storedToken);

    // Verificar si el token no existe y redirigir a la página de login
    if (!storedToken) {
      router.push('/auth/login');
    }
  }, [router]);

  const { data, loading, error } = useQuery(obtenerUsuario, {
    variables: { token },
    skip: !token, // Saltar la consulta si no hay token
  });

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="bg-gray-200 min-h-screen w-screen">
        <div className="flex min-h-screen">
          {pathname === "/auth/login" || pathname === "/auth/register" ? (
            <>
              {children}
            </>
          ) : (
            <>
              <Sidebar />
              <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-0 flex flex-row">
                <div className="p-5 w-full">
                  <div className="flex justify-between">
                    <div className="flex justify-between w-full mx-32">
                      <h3 className="font-semibold text-2xl">Hola - {data?.obtenerUsuario?.nombre}{' '}{data?.obtenerUsuario?.apellido}</h3>
                      <button 
                        onClick={cerrarSesion}
                        className="flex justify-center items-center text-white bg-red-600 p-1 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                          />
                        </svg>
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                  {children}
                </div>
              </main>
            </>
          )}
        </div>
      </div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </>
  );
};

export default ContenidoPrincipal;