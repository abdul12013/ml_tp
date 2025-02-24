import React, { useContext } from 'react'
import {assets} from  '../assets/assets'
import { NavLink , Link} from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
const Navbar = () => {
  const [visible,setvisible]=useState(false)
  const [show,setShow]=useState(false)
  const {setShowSearch , getCardCount,navigate,token,setToken,backendUrl,setCardItem}=useContext(ShopContext)
  const logout=()=>{
    localStorage.removeItem('token')
    setToken('')
    setCardItem({})
    navigate('/login')
  }
  return (
    <div className=' flex item-center justify-between py-5 font-medium'>
     <Link to='/'><img src={assets.logo} className='w-36'/>
     </Link>
     <ul className=' hidden sm:flex gap-5 text-sm text-gray-700'>
      <NavLink to='/' className='flex  flex-col items-center gap-1'>
        <p>HOME</p>
        <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
      </NavLink>


      <NavLink to='/collection' className='flex  flex-col items-center gap-1 '>
        <p>COLLECTION</p>
        <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700 hidden '></hr>
      </NavLink>

      <NavLink to='/about' className='flex  flex-col items-center gap-1'>
        <p>ABOUT</p>
        <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
      </NavLink>

      <NavLink to='/contact' className='flex  flex-col items-center gap-1'>
        <p>CONTACT</p>
        <hr className=' w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
      </NavLink>

     
     </ul>
     <div className='flex items-center  gap-6 '>
      <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className=' w-5 cursor-pointer'/>

      <div className=' group relative  flex gap-6'>
    <img onClick={()=> token ? setShow(!show) : navigate('/login')} src={assets.profile_icon}  className='w-5 cursor-pointer '/>
    {/* Dropdown */}
    {show && token &&
    <div className=' absolute dropdown-menu right-0 top-4 pt-4'>
    <div className=' flex flex-col gap-2 w-36 py-3 bg-slate-100 text-gray-500 rounded'>
      <p className=' cursor-pointer hover:text-black'>My Profile</p>
      <p onClick={()=>{navigate('/orders')}}  className=' cursor-pointer hover:text-black'>Orders</p>
      <p onClick={()=>{logout()}} className=' cursor-pointer hover:text-black'>Logout</p>
    </div>
    </div>}
      
      <Link to='/card'>
      <img src={assets.cart_icon} className='w-5 min-w-5 '/>
      <p  className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-md text-[8px]'>{getCardCount()}</p>
      </Link>
     </div>
     <img onClick={()=>{setvisible(true)}} src={assets.menu_icon} className=' w-5 cursor-pointer md:hidden'/>
     </div>
    
      {/* sidebar menu for small screen */}
      <div className={`absolute  top-0 right-0 bottom-0 overflow-hidden bg-white  transition-all ${visible ? 'w-full ': 'w-0'}`}>
          <div className=' flex flex-col text-gray-600'>
            <div onClick={()=>{setvisible(false)}} className='flex items-center gap-4 p-3 cursor-pointer '>
              <img className='h-4 rotate-180' src={assets.dropdown_icon}/>
              <p>Back</p>
            </div>
          <NavLink onClick={()=>{setvisible(false)}} to='/' className='py-2 pl-6 border'>HOME</NavLink>
          <NavLink onClick={()=>{setvisible(false)}} to='/collection' className='py-2 pl-6 border'>COLLECTION</NavLink>
          <NavLink onClick={()=>{setvisible(false)}} to='/about' className='py-2 pl-6 border'>About</NavLink>
          <NavLink onClick={()=>{setvisible(false)}} to='/contact' className='py-2 pl-6 border'>Contact</NavLink>
          
          </div>
      </div>
       
    </div>
  )
}

export default Navbar