const Tabla = ({ clientes }) => {
  return (
    <table className="w-full shadow-lg rounded-b-sm">
      <thead>
        <tr>
          <th className="  p-2 bg-emerald-700 text-white">Nombre</th>
          <th className="  p-2 bg-emerald-700 text-white">Empresa</th>
          <th className="  p-2 bg-emerald-700 text-white">Email de contacto</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id} className="border border-gray-300 font-semibold bg-white ">
            <td className="border  border-gray-300 p-2">{cliente.nombre}</td>
            <td className="border border-gray-300 p-2">{cliente.empresa}</td>
            <td className="border border-gray-300 p-2">{cliente.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;