"use client"
import { usePathname } from "next/navigation"
import Sidebar from "./Sidebar"


//incopativildiad con el provider de apollo client cion la version 14 de next
const ContenidoPrincipal = ({children}) => {
    const pathname = usePathname()
    console.log(pathname==="login")

    console.log(pathname)
    return (

               <div className = "bg-gray-200 min-h-screen">
    <div className = "flex min-h-screen ">
        {pathname ==="/auth/login"|| pathname ==="/auth/register"?(
             <>
             {children}
             </>
        ):
        (
            <>
            <main className = "sm:w-2/3 xl:w-4/5 sm:min-h-screen p-0">
            <div className="flex flex-row">
            <Sidebar/>
            <div className="p-5">
            {children }
            </div>
            
            </div>
                
                </main>
            </>
        )}
   
    
   
    </div>
  </div>
  
 
  )
}

export default ContenidoPrincipal
