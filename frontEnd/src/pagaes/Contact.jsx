import React from 'react'
import Title from '../Components/Title'
import {assets} from '../assets/assets'
import NewLaterBox from '../Components/NewLaterBox'
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className="my-10 flex  flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6">
      <p className='font-semibold text-xl text-gray-600'>Our Store</p>
      <p className='text-gray-500'>Rashid Compount <br /> kausa mumbra </p>
      <p className='text-gray-500'>Tel: (+91)7208757995 <br /> Email: ak6935846@gmail.com</p>
      <p className='font-semibold text-xl text-gray-600'> Careers at forever</p>
      <p className='text-gray-500'>Learn more about ours team and job opening </p>
      <button className='border border-black px-8   py-4 text-sm hover:bg-black hover:text-white  transition-all duration-500'>Read More</button>

      <p></p>
        </div>
      </div>
      <NewLaterBox/>
    </div>

  )
}

export default Contact