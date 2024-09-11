import React from 'react'
import logo from "@/iconos/logo.svg"
import Image from 'next/image'
const layout = ({children}) => {
  return (
    <div className = "bg-gray-800 h-min-screen w-screen ">
        <div className="flex flex-col items-center space-y-3 mt-20">
        <picture>
        <Image className="w-32" src={logo}/>
      </picture>
     
        {children}
        </div>
      
    </div>
  )
}

export default layout
