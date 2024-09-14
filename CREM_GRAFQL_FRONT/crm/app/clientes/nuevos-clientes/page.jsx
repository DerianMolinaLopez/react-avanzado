import NuevoClienteForm from "@/components/NuevoClienteForm"

const PageNuevosClientes = () => {
  return (
    <div>
        <h3 className = "font-bold text-3xl mt-10">Nuevo cliente</h3>
        <section className="flex justify-center">
             <NuevoClienteForm />
        </section>
     
    </div>
  )
}

export default PageNuevosClientes
