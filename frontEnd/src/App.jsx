import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pagaes/Home'
import Collection from './pagaes/Collection'
import About from './pagaes/About'
import Contact from './pagaes/Contact'
import Product from './pagaes/Product'
import Card from './pagaes/Card'
import Login from './pagaes/Login'
import Placeorder from './pagaes/Placeorder'
import Orders from './pagaes/Orders'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'


import { ToastContainer, toast } from 'react-toastify';
import Verify from './pagaes/Verify'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
    <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/collection' element={<Collection/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/contact' element={<Contact/>}/>
     <Route path='/product/:productId' element={<Product/>}/>
     <Route path='/card' element={<Card/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/placeorder' element={<Placeorder/>}/>
     <Route path='/orders' element={<Orders/>}/>
     <Route path='/verify' element={<Verify/>}/>
    </Routes> 
    <Footer/>
    </div>
   
  )
}

export default App