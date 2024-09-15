

const ContraseñaForm = ({password,setPassword}) => {
  return (
    <form 
    className="w-96 bg-white rounded-lg  p-8 mt-2">
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

export default ContraseñaForm
