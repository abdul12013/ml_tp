import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom'

const Verify = () => {
    const{navigate,token,setCardItem}=useContext(ShopContext)
    const [searchParams, setSearchParams]=useSearchParams()
    
    const succes =searchParams.get('success')
    const orderId=searchParams.get('orderId')
    
  return (
    <div>Verify</div>
  )
}

export default Verify