require('dotenv').config()
const Razorpay = require("razorpay")
const  orderModel =require("../models/orderModel")
const UserModel = require("../models/UserModel")


//Placing orders usimg  COD METHOD 
const currency='inr'
const deliveryCharge=10

// initialize razorpay gatway
const razorPayInstance= new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRATE
})


const placeOrder=async (req,res)=>{
    try{
        const {userId,items,amount,address,}=req.body
        let id=userId.id
        console.log(userId,items,amount,address)
        const orderData={
          
            items,
            address,
            userId:userId.id,
            amount,
            PaymentMethod:"cod",
            payment:false,
            date:Date.now()
        }
    const newOrder= await orderModel.create(orderData)
      

        await UserModel.findByIdAndUpdate(userId.id,{cartData:{}})
        res.json({success:true ,message: "Order placed"})

    }
    catch(error ){
        res.json({success:false ,message:error.message})
    }

}
// Placing order using razor pay 

const placeOrderRazorpay=async (req,res)=>{
        try{
            const {userId,items,amount,address,}=req.body
    
        console.log(userId,items,amount,address)
        const orderData={
          
            items,
            address,
            userId:userId.id,
            amount,
            PaymentMethod:"RazorPay",
            payment:false,
            date:Date.now()
        }
    const newOrder= await orderModel.create(orderData)
      
        const option={
            amount:amount * 100,
            currency: currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }    

        await razorPayInstance.orders.create(option,(error,order)=>{
            if(error){
                console.log(error)
                return res.json({success:false ,message:error.message})

            }
            res.json({success:true ,order})

        })

        }
        catch(error){
            res.json({success:false ,message:error.message})
        }
}

// verify razorPay payment 
const verifyRazorPay= async (req,res)=>{
    try{
    const {userId, razorpay_order_id}=req.body
    const orderInfo= await razorPayInstance.orders.fetch(razorpay_order_id)
   if(orderInfo.status === 'paid'){
    await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
    await UserModel.findByIdAndUpdate({_id:userId.id,cards:{}})
    res.json({success:true ,message:"Payment Success"})
   }
   else{
    res.json({success:true ,message:"tumhare to laude lag gaye"})
   }
    }
    catch(error){
        res.json({success:false ,message:error.message})
    }
}

const allOrders=async(req,res)=>{
    try{
        const orders= await orderModel.find({})
        res.json({success:true ,orders})
    }
    catch(error){
        res.json({success:false ,message:error.message})
    }

}

const userOrder= async(req,res)=>{
    try{
        const {userId}=req.body
        const orders=await orderModel.find({userId:userId.id})
   
        if(orders){
            return  res.json({success:true ,orders})
        }
        else{
            res.json({success:false ,message:"orders array is not found "})
        }
    }
    catch(e){
  res.json({success:false ,message:e.message})
    }

}

const  updateOrder=async(req,res)=>{
    try{
        const {orderId, status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({status:true , message:"Status Upadated"})
    }
    catch(error){
        console.log(error.message)
        res.json({status:true , message:error.message})
    }

}

module.exports={verifyRazorPay, placeOrder, placeOrderRazorpay, allOrders,userOrder,updateOrder}