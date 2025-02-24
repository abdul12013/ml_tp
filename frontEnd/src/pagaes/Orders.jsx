import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { useEffect } from 'react'
import axios from 'axios'

const Orders = () => {
  const {backendUrl,token, currency}=useContext(ShopContext)
  const [orderData, setorderData]=useState([])

  const loadOrderData= async()=>{
    try{
      if(!token){
        return null
      }
      const responce= await axios.post(`${backendUrl}/api/order/userOrder`,{},{headers:{token}})
      console.log(responce.data.orders)
      if(responce.data.success){
        let allOrderItem=[]
        responce.data.orders.map((order)=>{
         
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']= order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrderItem.push(item)
          })
        })   
        setorderData(allOrderItem.reverse())     
      }
    }
    catch(error){
      console.log(error.message )
    }
  }

  useEffect(()=>{loadOrderData()},[token])
  return (
    <div className='border-t pt-26'>
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div className="">
        {
          orderData.slice(0,4).map((item,index)=>(
            

            <div className="py-4 border-1 border-b text-gray-700 flex flex-col md:flex-row  md:item-center md:justify-between gap-4 " key={index}>
              <div className="flex items-start gap-6 text-sm">
                 <img className='w-16 sm:w-20 ' src={item.image[0]}/>
                 <div>
                 <p className="sm:text-base font-medium">{item.name}</p>
              <div className="flex  gap-3 mt-2 text-base text-gray-700">
                <p >{currency}{item.prize}</p>
                <p>Quantity:{item.quantity}</p>
                <p>Size:{item.size}</p>
                </div>
                <p className="mt-1">Date <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                {/* <p className="mt-2">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p> */}
              </div>
              
             
            </div>
            <div className=" md:w-1/2 flex justify-between"> 
              <div className=" flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm h-10 mr-5 hover:bg-black hover:text-gray-300 hover:transition-all ease-in-out duration-200 ">Track Order</button>
              </div>
              
 </div>
              
          ))
        }
      </div>
    </div>
  )
}

export default Orders