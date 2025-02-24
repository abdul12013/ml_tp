const express=require('express')
const cors=require("cors")
require('dotenv').config()
const connection =require('./config/mongoDb')
const ConnectClaudinary = require('./config/claudinary')
const cardRouter=require('./routes/cardRoute')
const OrderRouter= require('./routes/orderRoute')
// importing routing file 
const userRouter=require('./routes/userRoute')
const productRouter=require('./routes/productRoute')

// importing routing file 

const app=express()
const port=process.env.PORT 




//middleweres
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//dataBase connection
connection()

//claudinary connection
ConnectClaudinary()

// api endPoints
//user endpoints
app.use('/api/user',userRouter)
app.use('/api/card',cardRouter)
//product endpoint
app.use('/api/product',productRouter)

//order router 
app.use('/api/order',OrderRouter)

app.get('/', (req,res)=>{
   
    res.send("ky bolte public")
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})