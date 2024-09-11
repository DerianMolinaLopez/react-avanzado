import React from 'react'

const LoginPage = () => {
  return (
    
      <form action="">
        
          <div className = "w-80 bg-white rounded-lg shadow-xl p-8">
            <h2 className = "text-3xl font-semibold text-center">Iniciar Sesión</h2>
            <input type = "text" placeholder = "Correo Electrónico" className = "w-full border-2 border-gray-300 rounded-lg p-2 mt-4"/>
            <input type = "password" placeholder = "Contraseña" className = "w-full border-2 border-gray-300 rounded-lg p-2 mt-4"/>
            <button className = "w-full bg-emerald-500 hover:bg-emerald-700 transition-colors duration-200 text-white rounded-lg p-2 mt-4">Iniciar Sesión</button>
            <p className = "text-center mt-4">¿No tienes una cuenta? <a href = "/cuenta-nueva" className = "text-blue-500">Regístrate</a></p>
        
        </div>
      </form>
    
  )
}

export default LoginPage
