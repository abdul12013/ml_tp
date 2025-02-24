import React, { createContext, useEffect, useState } from 'react'


export const AdminContext =createContext()
  

const AdminContextProvider=(props)=>{
    const [token, setToken]=useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")
    const  backendUrl=import.meta.env.VITE_BACKEND_URL
    const currency="$"


useEffect(()=>{
    localStorage.setItem("token",token)
},[token])

    const value={
        token, setToken, backendUrl, currency
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider