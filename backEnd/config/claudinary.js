require('dotenv').config()
const claudinary=require('cloudinary').v2

const ConnectClaudinary=async()=>{
    claudinary.config({
        cloud_name:process.env.CLAUDINARY_NAME,
        api_key:process.env.CLAIDINARY_API_KRY,
        api_secret:process.env.CLAUDINARY_SECRATE_KEY
        
    })
}

module.exports=ConnectClaudinary