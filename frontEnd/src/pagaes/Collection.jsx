import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import { useEffect } from 'react'
import ProductItem from '../Components/ProductItem'



const Collection = () => {
  const {products,search, showSearch }=useContext(ShopContext)
  const [filterProduct, setFilterProduct]=useState([])
  const [showFilter,setShowFilter]=useState(false)
  const [category, setCategory]=useState([])
  const [subCategory, setSubCategory]=useState([])
  const [sortType, setSortType]=useState("relavent")



  const toggleCaterogy=(e)=>{
    if(category.includes(e.target.value)){
            setCategory(pre=>pre.filter(item=> item !== e.target.value))
    }
    else{
      setCategory(pre=> [...pre,e.target.value])
    }
  }
  const toggleSubCategory=(e)=>{

    if(subCategory.includes(e.target.value)){
      setSubCategory(pre=>pre.filter(item=> item!==e.target.value))
    }
    else{
      setSubCategory(pre=>[...pre,e.target.value])
    }
  }
  

  const applyFilter=()=>{
    let productCopy=products.slice()

    if(category.length>0){
     
      productCopy=productCopy.filter(item => category.includes(item.category))
    }
    if(subCategory.length>0){
      
      productCopy=productCopy.filter(item => subCategory.includes(item.subCategory))
      console.log(productCopy)
     
    }
    if(showSearch && search){
      productCopy=productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase().trim()))
      console.log(productCopy)
    }
   
    setFilterProduct(productCopy)
    }

    const sortProduct=()=>{
      let fiProduct=filterProduct.slice()
     
      switch(sortType){
        case "low-high":
          setFilterProduct(fiProduct.sort((a,b)=>(a.prize - b.prize)))
          break;
        case "high-low":
          setFilterProduct(fiProduct.sort((a,b)=>(b.prize - a.prize)))
          break;
        default:
          applyFilter()
          break;
      }
    }
  
  
  

 

  useEffect(()=>{
    applyFilter()
   
   },[search,category,subCategory, showSearch, products])

   useEffect(()=>{
    sortProduct()
   },[sortType,products])

   
  

  
  return (
    <div className=' flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* creating filter options */}
      <div className='min-w-60'>
        <p onClick={()=>{setShowFilter(!showFilter)}} className='my-2 text-xl flex item-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden${showFilter ?  '  rotate-90' : ''}`} src={assets.dropdown_icon}/>
        </p>

{/* category filter */}

        <div className={`border border-gray-400 pl-5 py-3 mt-6 ${showFilter ?'' :'hidden'} sm:block`}>
          <p className='  mb-3 text-sm font-medium'>Category</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className=' flex gap-2'>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCaterogy}/>Men
            </p>
            <p className=' flex gap-2'>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCaterogy}/>Women
            </p>
            <p className=' flex gap-2'>
              <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCaterogy}/>Kids
            </p>
          </div>
        </div>
        {/* sub category filter */}



        <div className={`border border-gray-400 pl-5 py-3 my-5 ${showFilter ?'' :'hidden'} sm:block`}>
          <p className='  mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className=' flex gap-2'>
              <input className='w-3' type='checkbox' value={"Topwear"} onChange={toggleSubCategory}/>Topwere
            </p>
            <p className=' flex gap-2'>
              <input className='w-3' type='checkbox' value={"Bottomwear"} onChange={toggleSubCategory}/>Bottomwere
            </p>
            <p className=' flex gap-2'>
              <input className='w-3' type='checkbox' value={"Winterwear"} onChange={toggleSubCategory}/>Winterwere
            </p>
          </div>
        </div>
        
      </div>


      {/* right side */}
      <div className='flex-1 '>
        <div className=' flex justify-between text-base sm:text-2xl mb-3'>
      <Title text1={'ALL'} text2={'COLLECTION'}/>

        {/* product sort */}
        <select onChange={(e)=> setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
          <option value="relavent">Sort by:Relavent</option>
          <option value="low-high">Sort by:Low to High</option>
          <option value="high-low"> Sort by: High to Low</option>
        </select>
        </div>
        {/* map product */}

        {
          <div className=' grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
              filterProduct.map((item, index)=>{
               
                return  <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.prize}/>

                
              })
              
            }
          </div>
        }
      </div>

    </div>
  )

}
export default Collection