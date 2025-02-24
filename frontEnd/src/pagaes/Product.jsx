import React, { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import RelatedProduct from '../Components/RelatedProduct'
import { toast } from 'react-toastify'

const Product = () => {
  const {productId}=useParams() //
  const {products,currency,token, addToCard}=useContext(ShopContext)
  const [productData, setProductData]=useState(null)
  const [image, setImage]=useState('')
  const  [size , setSize]=useState('')

  const fetchProductData= async()=>{
   
    // let copy= products.filter(item => item._id.includes(productId))
    // copy.map((e)=>{
    //  setImage(e.image[0])
      
    // })
    // setProductData(copy)
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
      }
    })

    
   
  }


useEffect(()=>{

  fetchProductData()
},[productId,products])




  return productData ? (
    <div className=' border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100' >
      {/* product data */}
      <div className='flex gap-12  sm:gap-12 flex-col sm:flex-row '>
        {/* product images */}

  <div className=' flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
    <div className='flex flex-col overflow-x-auto  overflow-y-scroll justify-between sm:justify-normal sm:w-[11%] w-full'>
      
         {
          productData.image.map((item,index)=>{
            return <img onClick={()=>{setImage(item)}} key={index} src={item} className='w-[40%] mb-3 sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
          })
          
      
         
    }
 </div>
 <div className='w-full md:w-[40%] sm:w-[80%]'>
  <img src={image} className='w-full h-auto  ' />
 </div>

 {/* product info ...................... */}
 <div className='flex-1'>
    <h1 className='font-medium text-2xl mt-2 mt-2'>{productData.name}</h1>
    <div className='flex items-center gap-1 mt-2'>
      <img src={assets.star_icon} alt="" className="w-3 5" />
      <img src={assets.star_icon} alt="" className="w-3 5" />
      <img src={assets.star_dull_icon} alt="" className="w-3 5" />
      <img src={assets.star_dull_icon} alt="" className="w-3 5" />
      <img src={assets.star_dull_icon} alt="" className="w-3 5" />
      <p className='pl-2'>(122)</p>
    </div>
    <p className='mt-5 text-3xl font-medium'>{currency}{productData.prize}</p>
    <p className='pt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

    <div className=' flex flex-col gap-4 my-8'>
      <p>Select Size</p>
      <div className='flex gap-2'>
          {productData.sizes.map((item,index)=>(
          
            
              <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' :''}`}   key={index} >{item}</button>
            
           
          ))

}
      </div>
    </div>
      <button onClick={()=> !token ? toast.error('please Login first') :addToCard(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
      <hr className=' mt-8 sm:w-4/5 '></hr>
      <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
        <p>100% Original product</p>
        <p>Cash on delivery is available on this product. </p>
        <p>Easy retrurn and Exchange policy in seven days </p>
      </div>
 </div>
  </div>
      </div>
      {/* ...................description and review section .................................. */}

      <div className=' mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus minima voluptates tempore fuga, non quidem. Earum delectus ipsa atque porro!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ad libero. Qui, nostrum? Nam, consectetur?</p>
        </div>
      </div>

      {/* ............Display Related  products............ */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) :(
    <div className='opacity-0'></div>
  )
}

export default Product