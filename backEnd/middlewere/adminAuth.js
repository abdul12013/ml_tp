const jwt=require('jsonwebtoken')

const adminAuth=(req,res,next)=>{
    try{
        const {token}= req.headers
        if(!token){
            return res.json({success:false,message:"NOT AUTHORIZED LOGIN AGAIN "})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRATE)
        console.log(token)

        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD  ){
            return res.json({success:false,message:"babu gand masti nhi"})
        }
        next()
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }
}

module.exports=adminAuth 