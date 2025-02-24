import { createContext, useEffect, useState } from "react";


export const ShopContext=createContext()

import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShopContextProvider=(props)=>{
    const currency='$'
    const delivery_fee=10
   const  backendUrl=import.meta.env.VITE_BACKEND_URL
    const[products,setProducts]=useState([])

    const [token, setToken]=useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")

    const [cardItem,setCardItem]=useState([])
    const [search,setSearch]=useState('')
    const [showSearch, setShowSearch]=useState(false)
    const navigate =useNavigate()
    const addToCard=async (itemId,size)=>{
        let cardDta=structuredClone(cardItem)
        if(!size){
            toast.error(' Please select the product size')
            return
        }
        if(cardDta[itemId]){
            if(cardDta[itemId][size]){
                cardDta[itemId][size] +=1
            }
            else{
                cardDta[itemId][size]= 1
            }
        }
        else{
            cardDta[itemId]={};
            cardDta[itemId][size]=1
        }
        setCardItem(cardDta)
        if(token){
            try{
                console.log(token)
                const responce=await axios.post(`${backendUrl}/api/card/add`, {itemId,size}, {headers:{token}})
                console.log(responce.data)
                if(responce.data.succes){
                toast.success(responce.data.message)
            }
            else{
                toast.error(responce.data.message)

            }
            }
            catch(error){
                console.log(error.message)
                toast(error.message)

            }
        }

}

const getCardCount=()=>{
    let totalCount=0
    for(const items in cardItem){
       for(const item in cardItem[items]){
      
        try{
            if(cardItem[items][item] >0){
                    totalCount +=cardItem[items][item]
            }
        }
        catch(e){
            toast.error(' Fucking error ')
        }
       }
    }
    return totalCount
}

const updateQuantity= async( itemId ,size ,quantity)=>{
    let cardData=structuredClone(cardItem)

    cardData[itemId][size]=quantity
      
       
        setCardItem(cardData) 
        if(token){

            try{
                const response=await axios.post(`${backendUrl}/api/card/update`, {itemId,size,quantity}, {headers:{token}})
                console.log(response.data)
            }
            catch(error){
                console.log(error.message)
                toast.error(error.message)
            }
        }
}

const getCardAmount=()=>{
    let totalAmount=0
   
  
    for(const items in cardItem){
        // console.log(items)
        let itemInfo= products.find((product)=> product._id === items)
        
      
        for(const item in cardItem[items]){
            try{
                if (itemInfo && itemInfo.prize) {
                      
               if(cardItem[items][item] >0){
                totalAmount+=itemInfo.prize * cardItem[items][item];
             }
                } 
                else {
                    console.error("Item not found for ID:", items);
                }
              
             }
            catch(error){
                console.log(error.message )
                toast.error(error.message)

           }
         }
    }
    return totalAmount
 

}



const getUserCart=  async()=>{
    try{
        const responce=await axios.get(`${backendUrl}/api/card/get`,{headers:{token}})
        console.log(responce.data.succes)
        if(responce.data.succes){
            setCardItem(responce.data.cardData)
           
        }
        
    }
    catch(error){
        console.log(error.message)
        toast.error(`${error.message} bolo baap`)
    }
}



    // useEffect(()=>{
    //     getCardCount()
    //     },[cardItem])

useEffect(()=>{
    getProduct()
},[products])

useEffect(()=>{
    // if(!token  && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart()
        // getCardAmount()
    // }
},[token])
// useEffect(()=>{

// },[])


        // getting the product data 
        const getProduct=async ()=>{
            try{
                const response=await axios.get(`${backendUrl}/api/product/list`)
             
                if(response.data.success){
                    setProducts(response.data.products)
                }
                else{
                    toast.error(response.data.message)
                }
            }
            catch(error){
                console.log(error.message)
            }
        }
            const value={
                products,currency,delivery_fee,setCardItem,
                search ,setSearch, showSearch, setShowSearch,
                cardItem, addToCard,getCardCount , updateQuantity, getCardAmount, navigate,token,setToken,backendUrl
            }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider