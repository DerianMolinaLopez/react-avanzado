"use client"
//!caudno se usa consultas de x tipo solo debe ser componentes de cliente
import { useQuery } from "@apollo/client"
import { obtenerClientesUsuario } from "@/queries"
import Tabla from "@/components/Tabla"
const ClientesPage = () => {
    const {data} = useQuery(obtenerClientesUsuario)
    console.log(data)
  return (
    <div>
      <h2 className ="font-black text-5xl mb-10">Clientes</h2>
      {data&&<Tabla clientes={data.obtenerClientesByVendedor}/>}
    </div>
  )
}

export default ClientesPage