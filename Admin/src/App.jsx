import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from '../src/pages/Add'
import List from '../src/pages/List'
import Orders from './pages/Orders'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Add <ToastContainer /> in your root component
import { AdminContext } from './context/AdminContext'




const App = () => {
 
  const {token} =useContext(AdminContext)
  
  return (
    <div className="bg-gray-100 min-h-screen">
       <ToastContainer/>
      {
       
        token ===''
          ? <Login />
          :
          <>
            <Navbar />
            <hr />
            <div className="flex w-full">
              <Sidebar />
              <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                {
                  < Routes>
                    <Route path='/add' element={<Add />} />
                    <Route path='/list' element={<List />} />
                    <Route path='/order' element={<Orders />} />
                  </Routes>
                }
              </div>

            </div>
          </>

      }

    </div>
  )
}

export default App