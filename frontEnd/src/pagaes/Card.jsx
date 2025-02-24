import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import CardTotal from '../Components/cardTotal'


const Card = () => {
  const {products, currency, cardItem ,getCardCount, updateQuantity, navigate}=useContext(ShopContext)

  const[cardData, setCardData]=useState([])
  


  useEffect(()=>{
   if(products.length >0)
   {
    const tempData=[]
    for(const items in cardItem){
      for(const item in cardItem[items]){
        if(cardItem[items][item] >0){
          tempData.push({
            _id:items,
            size:item,
            quantity:cardItem[items][item]

          })
        }
      }
    }
    setCardData(tempData)
   }
  }
  ,[cardItem, products])


  return (
    <div className='border-t pt-14 '>
      <div className='text-2xl mb-3'>
      <Title text1={'YOURS'} text2={'CARD'}/>
      </div>
      <div className=''>
        {
          
  cardData.map((items)=>{
    const productData=products.filter((product)=> product._id === items._id)
      return  productData.map((item , index)=>{
          
   
            
           return(
              <div key={index} className='py-4 borderr-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'> 
              <div className='flex item-start gap-6'>
                <img className='w-16 sm:w-20 ' src={item.image[0]}/>
                <div>
                  <p className='text-sm sm:text-lg font-medium'>{item.name}</p>
                  <div className='flex items-center gap-5 mt-2' > 
                    <p>{currency}{item.prize}</p>
                    <p className=' px-2 sm:px-3 sm:py-1 border bg-slate-50'>{items.size}</p>
                  </div>
                  </div>
              </div>
              <input onChange={(e)=> e.target.value === '' || e.target.value ==='0 ' ? null : updateQuantity(items._id,items.size ,Number(e.target.value))} className=' border-1  max-w-10 sm:mx-w-20 px-1 sm:px-2 py-1' type='number' min={1} defaultValue={items.quantity} ></input>
              <img onClick={()=>{updateQuantity(items._id, items.size,0)}} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} />
              
              </div>
             
           )
  })
  
          })
        }
        <div className='flex justify-end my-20'>
              <div className='w-full sm:w-[450px]'>
              <CardTotal/>
              <div className='w-full text-end '>
                <button onClick={()=> navigate('/placeorder')} className='bg-black text-white text-sm my-8 px-8 py-3 hover:scale-95  hover:transition-all ease-in-out'>PROCEED TO CHECKOUT</button>

              </div>
              </div>
            </div>
      </div>
    </div>
  )
}

export default Card