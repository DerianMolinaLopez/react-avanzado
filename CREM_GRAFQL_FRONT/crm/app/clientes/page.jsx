"use client"
//!cuan se usa consultas de x tipo solo debe ser componentes de cliente
import { useQuery } from "@apollo/client"
import { obtenerClientesUsuario } from "@/queries"
import Link from "next/link"
import Tabla from "@/components/Tabla"
const ClientesPage = () => {
    const {data} = useQuery(obtenerClientesUsuario)
    console.log(data)
  return (
    <div>
      <h2 className ="font-black text-5xl mb-10">Clientes</h2>
      <Link
      href = "/clientes/nuevos-clientes"
        onClick={()=>router.push('/clientes/nuevo')}

        className = "bg-emerald-800 py-2 px-5 inline-block font-semibold text-white my-3 rounded-lg hover:bg-blue-500"
      >
        Crear nuevo cliente
      </Link>
      {data&&<Tabla clientes={data.obtenerClientesByVendedor}/>}
    </div>
  )
}

export default ClientesPage