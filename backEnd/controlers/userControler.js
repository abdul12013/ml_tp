require("dotenv").config()
const UserModel=require('../models/UserModel')
const validater=require('validator')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


//generating the token
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRATE)
}


// route for user login
const loginUser=async(req,res)=>{

    try{
        const{email,password}=req.body

        const user=await UserModel.findOne({email})
        if(!user){
            return   res.json({success:false,message:"user is not  exist"})
        }
       
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=createToken(user.id)
            return res.json({success:true, token})
        }
        else{
   res.json({success:false,message:"you enter the WRONG PASSWORD"})
        }

    }
    catch(error){
       res.json({success:false,message:error.message})
    }

}

// route for register user

const registerUser=async(req,res)=>{
       try{
        const{name,email,password}=req.body
       

        //checking user already exist
        const exist=await UserModel.findOne({email})
        if(exist){
            return res.json({success:false, message:"User already exist"})
        }
        else{
            // validating  email format and password
            if(!validater.isEmail(email)){
                return res.json({success:false, message:"Please enter the valid email"})
            }


            if(password.length <4){
                return res.json({success:false, message:"your password lent must be equal to aur greater then 4"})
            }
            //hashing the password
           const salt=await bcrypt.genSalt(10)
           const hashedPassword=await bcrypt.hash(password,salt)

           // adding new user data in the data base
           const Newuser= await UserModel.create({
            name,
            email,
            password:hashedPassword
           })

          const token= createToken(Newuser._id)
           res.json({success:true,token})

        }
       }
       catch(error){
        return res.json({success:false, message:error.message})
       }
}


// route for admin login
const adminLogin=async(req,res)=>{

        try{
            const {email, password}=req.body
            console.log(email , password )
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
                const token=jwt.sign(email+password,process.env.JWT_SECRATE)
                return res.json({success:true,token})
            }
            else{
                return res.json({success:false,message:"invalid credentional"})
            }
        }
        catch(error){

        }
}

module.exports={loginUser,registerUser, adminLogin}