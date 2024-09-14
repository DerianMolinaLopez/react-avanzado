
import Link from "next/link"
import { usePathname } from 'next/navigation'
const Sidebar = () => {
  const pathname = usePathname()
  console.log("ruta en la que nos ubicamos")
  console.log(pathname)
  return (
      <aside className = "bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
        <div>
            <p className="text-white text-4xl  font-black mb-10">CRM Cientes</p>
            <nav className = "flex flex-col text-white font-semibold text-xl gap-5">
            <Link href="/clientes" className={` p-2 ${pathname==='/clientes' || pathname==="/clientes/nuevos-clientes"?"bg-blue-800":''} hover:bg-blue-400`}>CLientes</Link>
            <Link href="/pedidos" className={` p-2 ${pathname=='/pedidos'?"bg-blue-800 ":''}`}>Pedidos</Link>
            <Link href="/productos" className={`p-2 ${pathname=='/productos'?"bg-blue-800 ":''}`}>Prodcutos</Link>
            </nav>
        </div>
      </aside>
  )
}

export default Sidebar
