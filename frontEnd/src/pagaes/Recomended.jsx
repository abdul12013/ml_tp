
import { useState } from 'react'
import { assets, products } from '../assets/assets'
import { useRef } from 'react'
import { useEffect } from 'react'

import MlCard from '../Components/MlCard'
import Title from '../Components/Title'
import React from "react";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios'


const Recomended = () => {

    //slider part
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  const [search, setSearch]=useState('')
  const fileRef=useRef(null)
  const[discount,setDiscount]=useState([])
  const [product, setProduct]=useState([])
  

  const allDiscounts= async()=>{
      const response=await axios.get(`http://127.0.0.1:8000/discounted`)
      // console.log(response.data.recommended_products)
      setDiscount(response.data.recommended_products)
  }

  const allProduct= async()=>{
    const response=await axios.get(`http://127.0.0.1:8000/`)
     console.log(response.data.allproduct)
     setProduct(response.data.allproduct)
    
  }


  useEffect(()=>{
   allDiscounts()
   allProduct()
  },[])
  return (
    // <div>

    <div>
       <div className='border-1 border-b bg-gray-50 text-center'>
              <form  className=' inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2  ' encType='multipart/form-data'>
              <input value={search} onChange={(e)=>{setSearch(e.target.value)}} className='flex-1 outline-none bg-inherit text-sm' type='text' placeholder='Search'/>
              <input type='file' className=' hidden' ref={fileRef}/>

              <img src={assets.imageUpload} className=' cursor-pointer w-4 ml-8' onClick={()=>{fileRef.current.click()}}/>
              <img className='w-4 ml-5' src={assets.search_icon} alt=''  />

              </form>
             
              
          </div>



          {/* Cardslider */}
          <Title text1={"Discounted"} text2={"products"}/>
          <div className="w-full h-auto p-5">
        
          {/* Manually Adding Cards */}
          <div className="px-2 ml-2">
          <Slider {...settings}>
            {
              discount.map((item,id)=>(
                
                 <MlCard key={id} title={item.title} images={item.images} current_price={item.current_price} />
              
              ))
            }
              </Slider>
            
          </div>
      </div>
        {/* Cardslider */}

      <div className='grid grid-cols-2  sm:grid-cols-4  gap-4 px-2 ml-2'>
     
            {
              product.map((item,ids)=>{
                return <MlCard key={ids} title={item.title} images={item.images} current_price={item.current_price}  />
              })
            }
      </div>
    </div>
         
    
   
  )
}

export default Recomended