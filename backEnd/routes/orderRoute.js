const express=require('express')


const {placeOrder, placeOrderRazorpay, allOrders,userOrder,updateOrder, verifyRazorPay}=require('../controlers/orderController')
const adminAuth  = require("../middlewere/adminAuth")
const AuthUser=require('../middlewere/auth')

const OrderRouter=express.Router()

OrderRouter.post('/list',adminAuth,allOrders)

OrderRouter.post('/status',adminAuth,updateOrder)

// payment feature 
OrderRouter.post('/place',AuthUser,placeOrder)
OrderRouter.post('/razorPay',AuthUser,placeOrderRazorpay)
OrderRouter.post('/verifyRazorpay',AuthUser,verifyRazorPay)

//user Feature
OrderRouter.post('/userOrder',AuthUser,userOrder)

module.exports=OrderRouter