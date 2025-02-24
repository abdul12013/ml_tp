import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify/unstyled'

const Login = () => {
  const {navigate,token,setToken,backendUrl}=useContext(ShopContext)
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const [currentState, setCurrentState]= useState('Login')
  const onSubmitHandler= async(event)=>{
      event.preventDefault()
      try{
        if(currentState === "Sign Up"){
          const response=await axios.post(`${backendUrl}/api/user/registor`, {name,email,password})
          console.log(response.data)
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }else{
            toast.error(response.data.message)
          }
        }
        else{
          const response= await axios.post(`${backendUrl}/api/user/login`, {email,password})
          console.log(response.data)
          if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          }
          else{
            toast.error(response.data.message)
          }
        }
      }
      catch(error){
        console.log(error.message)
        toast.error(error.message)
      }
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={(event)=>{onSubmitHandler(event)}} className='flex flex-col items-center w-[50%] sm:max-w-96 m-auto mt-34 gap-4 text-gray-500 '>
      <div className="inline-flex items-center gap-2  mb-2 mt-20">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'></hr>
        </div>
      {currentState === 'Login' ? '' : <input  onChange={(e)=>{setName(e.target.value)}} value={name} type='text' required  className='w-full px-3 py-2 border border-gray-300' placeholder='Name'/>} 
        <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type='email' required  className='w-full px-3 py-2 border border-gray-300' placeholder='Name'/>
        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} type='Password' required  className='w-full px-3 py-2 border border-gray-300' placeholder='Name'/>
        <div className="w-full flex justify-between text-sm  mt-[-8px]">
          <p className="cursor-pointer">Forget your password</p>
          {
            currentState === 'Login'
            ? <p onClick={()=>setCurrentState('Sign Up')} className=" cursor-pointer"> Create Account</p>
            : <p onClick={()=> setCurrentState('Login')} className=" cursor-pointer">Login Here</p>
          }
        </div>
        <button className='bg-black text-white font-light px-3 py-2 mt-4' >{currentState === "Login" ? 'Login' : 'Sign Up'}</button>
    </form>
  )
}

export default Login