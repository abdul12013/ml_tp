const express=require('express')
const{loginUser,registerUser, adminLogin}=require('../controlers/userControler')
const router=express.Router()



router.post('/registor',registerUser)
router.post('/login',loginUser)
router.post('/admin',adminLogin)




module.exports=router