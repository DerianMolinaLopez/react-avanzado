"use server"
import { useMutation } from "@apollo/client";
import { eliminarCliente,confirmarPassword as confirmarPasswordQuery } from "@/queries";
import {obtenerClienteById} from "@/queries"

export async function eliminacionCliente (id){
    try{
        const [eliminar] = useMutation(eliminarCliente)
        try{
            const {data} = await eliminar({
                        variables:{
                            id
                        }
                    })
                    console.log(data)
        }catch(e){
            console.log(e)
        }
       
        console.log(data)
    }catch(e){
        console.log(e)
    }
    
}

export async function confirmarPassword(password){
    try{
        console.log("desde la confirmacion")
        const [confirmar] = useMutation(confirmarPasswordQuery)
        try{
            const {data} = await confirmar({
                        variables:{
                            password
                        }
                    })
                    console.log(data)
        }catch(e){
            console.log(e)
        }
       
        console.log(data)
    }catch(e){
        console.log(e)
    }
}
export async function obtenerClienteId(id){
    try{
        const [obtenerCliente] = useQuery(obtenerClienteById)
        try{
            const {data} = await obtenerCliente({
                        variables:{
                            id
                        }
                    })
                    console.log(data)
        }catch(e){
            console.log(e)
        }
       
        console.log(data)
    }catch(e){
        console.log(e)
    }
}