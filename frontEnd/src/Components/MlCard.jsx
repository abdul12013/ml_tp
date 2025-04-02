import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'


const MlCard = ({title,images,current_price}) => {


    const {currency}=useContext(ShopContext)
   
  return (
    <div className=' w-full flex flex-col sm:flex-row flex-wrap gap-10 ml-5 mt-5 justify-start '>
        <div className='h-80 font-medium'>
            <img src={images} className=' w-52 rounded-md'/>
            <p className='ml-1'>{title}</p>
            <p className=' w-1 h-7 '>{currency}{current_price}</p>
        </div>


    </div>
  )
}

export default MlCard