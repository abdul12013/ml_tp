const jwt= require('jsonwebtoken')


const AuthUser= async(req,res,next)=>{
    const {token}= req.headers
 

    try{
        if(!token){

            return res.json({succes:true, message:"not Authorized login again "})

        }
        else{
            const token_decode=jwt.verify(token,process.env.JWT_SECRATE)
            // console.log(token_decode)
            req.body.userId=token_decode
            next()
        }
        
        
    }
    catch(error){

    }
   
           
        
       
       
    
}

module.exports=AuthUser