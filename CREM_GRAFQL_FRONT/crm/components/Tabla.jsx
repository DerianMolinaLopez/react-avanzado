

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
              <button className="bg-red-700 p-1 hover:bg-red-500 transition-colors duration-150 text-white flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;