const mongoose=require('mongoose')

const connectDb=async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log('connect to the forever DataBase')
    })
     await mongoose.connect(`${process.env.MONGO_URI}/ClotingWebApp`)
}
module.exports=connectDb