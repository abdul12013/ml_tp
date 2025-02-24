import React, { useContext, useEffect, useState } from 'react'
import Title from '../Components/Title'
import CardTotal from '../Components/cardTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Placeorder = () => {
  const[method , setMethod]=useState('cod')
  const {navigate, backendUrl, token, cardItem, setCardItem, delivery_fee,getCardCount,products, getCardAmount}=useContext(ShopContext)
  const [formData, setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

const   onchangeHandler= (event)=>{
  const name=event.target.name
  const value=event.target.value
  setFormData(data=>({...data,[name]:value}))
}

const initPay=(order)=>{
  const option={
    key:import.meta.env.RAZORPAY_KEY_ID,
    amount:order.amount,
    currency:order.currency,
    name:"Order Payment",
    description:"order Payment",
    order_id:order.id,
    receipt:order.receipt,
    handler:async(response)=>{
      console.log(response)
      try{
        const {data}=await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response,{headers:{token}})
        if(data.success){
          navigate("/orders")
          setCardItem({})
        }
        else{
          console.log(data.message )
          toast.error(data.message)
        }
      }
      catch(error){
        console.log(error.message )
      }
    }
  }
  const rzp=new window.Razorpay(option)
  rzp.open()
}


 const onSubmitHandler=async(event)=>{
  event.preventDefault()
  console.log("chuchi ")
  try{
    let orderItems=[]
    for(const items in cardItem){
      for(const item in cardItem[items]){
        if(cardItem[items][item] >0){
          const itemInfo=structuredClone(products.find(products => products._id === items))
          if(itemInfo){
            itemInfo.size=item
            itemInfo.quantity=cardItem[items][item]
            orderItems.push(itemInfo)
          }
        }
      }
    }
   let orderData={
    address:formData,
    items:orderItems,
    amount:getCardAmount() +delivery_fee
   }
 let  address=orderData.address
 let amount=orderData.amount
 let items=orderData.items
   console.log(orderData.address)
   switch (method) {
    case 'cod':
        const response=await axios.post(`${backendUrl}/api/order/place`,{address,amount,items}, {headers:{token}})
        console.log(response)
        if(response.data.success){
          setCardItem({})
          navigate("/orders")
        }
        else{
          toast.error(response.data.message)
        }
      break;
    case 'razorpay':
        const responceRazorpay= await axios.post(`${backendUrl}/api/order/razorPay`,orderData,{headers:{token}})
        if(responceRazorpay.data.success){
          
        initPay(responceRazorpay.data.order)
        
      }
        break;

   
    default:
      break;
   }
  }
  catch(e){
 console.log(e.message )
  }
 }

  useEffect(()=>{
    console.log(method)
  },[method])
  return (
    <form onSubmit={(event)=>{onSubmitHandler(event)}} className=' flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t-[430px]>'>
      {/* {left side } */}
      <div className=' flex flex-col gap-4 w-full sm:max-w-[480px]'>
            <div className='text-xl sm:text-2xl my-3'>
              <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
            </div>
            <div className='flex gap-3'>
              <input required onChange={(event)=>{onchangeHandler(event)}} name='firstName' value={formData.firstName} type='text' className='border  border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='first name' />
              <input required onChange={(event)=>{onchangeHandler(event)}} name='lastName' value={formData.lastName} type='text' className='border  border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='last name ' />
            </div>
            <input required onChange={(event)=>{onchangeHandler(event)}} name='email' value={formData.email} type='email' className='border  border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='email address' />
            <input required onChange={(event)=>{onchangeHandler(event)}} name='street' value={formData.street} type='text' className='border  border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='street' />

            <div className='flex gap-3'>
              <input required onChange={(event)=>{onchangeHandler(event)}} name='city' value={formData.city} type='text' className='border  border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='City ' />
              <input required onChange={(event)=>{onchangeHandler(event)}} name='state' value={formData.state} type='text' className='border  border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='State' />
            </div>
            <div className='flex gap-3'>
              <input required onChange={(event)=>{onchangeHandler(event)}} name='zipcode' value={formData.zipcode} type='number' className='border  border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='Zipcode ' />
              <input required onChange={(event)=>{onchangeHandler(event)}} name='country' value={formData.country} type='text' className='border  border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='country ' />
            </div>
            
            <input required onChange={(event)=>(onchangeHandler(event))} name='phone' value={formData.phone} type='number' className='border  border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='Phone ' />
      </div>

      {/* =========================right side===================== */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CardTotal/>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>

          {/* ===================PAYMENT MRTHOD SELECTION=========================== */}
          <div className='flex gap-3 flex-col lg:flex-row '>
            {/* <div onClick={()=>{setMethod('stripe')}} className='flex item-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border  rounded-full   ${method === 'stripe' ? ' bg-green-400' :' '}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo}/>
            </div> */}

            <div onClick={()=>{setMethod('razorpay')}} className='flex item-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? ' bg-green-400' :' '}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo}/>
            </div>

            <div onClick={()=>{setMethod('cod')}} className='flex item-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' :' '}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

           
          </div>
          <div className="w-full text-end mt-8">
              <button type='submit'    className=' bg-black text-white px-16 py-3 text-sm hover:scale-110 '>PLACE ORDER</button>
            </div>
        </div>
      </div>

    </form>
  )
}

export default Placeorder