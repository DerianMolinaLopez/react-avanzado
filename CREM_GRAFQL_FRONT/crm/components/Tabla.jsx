
import { eliminarCliente } from "@/actions/operacionesClientes/operadoresClientes";
import ConfirmacionModal from "./ConfirmacionModal";
import { useState } from "react";
/*
 * falta hacer las paginas para el rediccionamiento
 * eso si, antes de hacer el rediccionamiento, 
 * agregar otra capa de seguridad para que cuando precione una de esas opciones
 * se solicite su contraseña para poder hacer el direccionamiento
 * 
*/
const Tabla = ({ clientes }) => {
  const [modal, setModal] = useState(false);
  const handleAbrirModal = (id) => {
    setModal(true)
  }
  return (
    <table className="w-full shadow-lg rounded-b-sm">
      <thead>
        <tr>
          <th className="  p-2 bg-emerald-700 text-white">Nombre</th>
          <th className="  p-2 bg-emerald-700 text-white">Empresa</th>
          <th className="  p-2 bg-emerald-700 text-white">Email de contacto</th>
          <th className=" w-80  p-2 bg-emerald-700 text-white">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id} className="border border-gray-300 font-semibold bg-white ">
            <td className="border  border-gray-300 p-2">{cliente.nombre}</td>
            <td className="border border-gray-300 p-2">{cliente.empresa}</td>
            <td className="border border-gray-300 p-2">{cliente.email}</td>
            <td className="flex justify-center gap-10">
              <button className="bg-indigo-700 p-1 hover:bg-indigo-500 transition-colors duration-150 text-white flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>

                Editar
              </button>
              <ConfirmacionModal modal={modal} setModal={setModal} />
            </td>
          </tr>
        ))}
      </tbody>
      
    </table>
    
  );
};
//<ConfirmacionModal modal={modal} setModal={setModal} />
export default Tabla;