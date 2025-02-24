const express=require('express')
const {ddToCard,updateCard, getUserCart, addToCard}=require('../controlers/cardController')
const AuthUser=require('../middlewere/auth')
const CardRouter=express.Router()

CardRouter.get('/get',AuthUser,getUserCart)
CardRouter.post('/add',AuthUser,addToCard)
CardRouter.post('/update',AuthUser,updateCard)

module.exports=CardRouter