import { eliminarCliente } from "@/actions/operacionesClientes/operadoresClientes";
import ConfirmacionModal from "./ConfirmacionModal";
import { useState } from "react";
import EdicionModal from "./EdicionModal";

/*
 * falta hacer las paginas para el rediccionamiento
 * eso si, antes de hacer el rediccionamiento, 
 * agregar otra capa de seguridad para que cuando precione una de esas opciones
 * se solicite su contraseña para poder hacer el direccionamiento
 * 
*/

const Tabla = ({ clientes }) => {
  return (
    <table className="w-full shadow-lg rounded-b-sm">
      <thead>
        <tr>
          <th className="p-2 bg-emerald-700 text-white">Nombre</th>
          <th className="p-2 bg-emerald-700 text-white">Empresa</th>
          <th className="p-2 bg-emerald-700 text-white">Email de contacto</th>
          <th className="w-80 p-2 bg-emerald-700 text-white">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <FilaCliente key={cliente.id} cliente={cliente} />
        ))}
      </tbody>
    </table>
  );
};

const FilaCliente = ({ cliente }) => {
  const [modal, setModal] = useState(false);

  const handleAbrirModal = () => {
    setModal(true);
  };

  const handleCerrarModal = () => {
    setModal(false);
  };

  return (
    <tr className="border border-gray-300 font-semibold bg-white">
      <td className="border border-gray-300 p-2">{cliente.nombre}</td>
      <td className="border border-gray-300 p-2">{cliente.empresa}</td>
      <td className="border border-gray-300 p-2">{cliente.email}</td>
      <td className="flex justify-center gap-10">
        <EdicionModal cliente={cliente.id} />
        <ConfirmacionModal modal={modal} setModal={setModal} cliente={cliente.id} />
      </td>
    </tr>
  );
};

export default Tabla;