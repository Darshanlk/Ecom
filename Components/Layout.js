import React from 'react'
import Navbar from './NavbarX'

export default function Layout({children}) {
  return (
   <>
     <Navbar/>
     {children}
   
   </>
  )
}
