import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import { useEffect } from 'react'
import ProductItem from './ProductItem'

const Latest_collection = () => {
    const {products}=useContext(ShopContext)
    const [LatestProduct, setLatestProduct]=useState([])

    useEffect(()=>{
        setLatestProduct(products.slice(0,10))
    },[products])
    
  return (
    <div className='my-10'>
        <div className=' text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, nulla!</p>
        </div>

        {/* rendering product */}
        <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

            {
                LatestProduct.map((item,index)=>{
                   
                   return  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.prize}/>

                })
            }
        </div>
    </div>
  )
}

export default Latest_collection