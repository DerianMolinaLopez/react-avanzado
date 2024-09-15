import { useMutation } from "@apollo/client";
import { eliminarCliente } from "@/queries";
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

