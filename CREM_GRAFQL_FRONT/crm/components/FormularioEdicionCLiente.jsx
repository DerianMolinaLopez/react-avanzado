import React from 'react'
import { useForm } from 'react-hook-form';

import { useQuery } from '@apollo/client';
import { obtenerClienteById,obtenerClientesUsuario } from '@/queries';
const FormularioEdicionCLiente = ({ cliente }) => {

   const {data,loading} = useQuery(obtenerClienteById,{
    variables:{
      id:cliente
    }
   })


    if(data) console.log(data)
    const password = ""
  return (
    <form>
        <h3></h3>
       <input
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      type="password"
      placeholder="Contraseña"
      className="w-full border-2 border-gray-300  rounded-lg p-2 "
    />
     <input
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      type="password"
      placeholder="Contraseña"
      className="w-full border-2 border-gray-300  rounded-lg p-2 "
    />
     <input
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      type="password"
      placeholder="Contraseña"
      className="w-full border-2 border-gray-300  rounded-lg p-2 "
    />
    </form>
  )
}

export default FormularioEdicionCLiente
