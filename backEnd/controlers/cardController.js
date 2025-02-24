
const UserModel = require('../models/UserModel')
const userModel=require('../models/UserModel')
// add product to the card 
const addToCard=async (req,res)=>{
    try{
        const {userId,itemId, size}=req.body
       
        userData= await UserModel.findOne({_id:userId.id})
       
        let cardData = userData.cartData ;
       
        if(cardData[itemId]){

     
        if(cardData[itemId][size]){
            cardData[itemId][size] +=1
        }
        else{
            cardData[itemId][size]=1
        }   }
        else{
            cardData[itemId]= {}
            cardData[itemId][size]=1
           
        }
        
        const  user2=await userModel.findOneAndUpdate({_id:userId.id},{$set:{cartData:cardData}})
        console.log(user2)

      
       
        res.json({succes:true, message:"added success"})
       
    }catch(error){
        console.log(error.message)
        res.json({succes:true, message:error.message})

    }

}

const updateCard=async (req,res)=>{
    try{
    const {userId,itemId, size, quantity}=req.body
    userData= await userModel.findById({_id:userId.id})
    let cardData=userData.cartData
    cardData[itemId][size]=quantity

    await userModel.findOneAndUpdate({_id:userId.id},{$set:{cartData:cardData}})
    res.json({succes:true, message:"card Updated "})
}
    catch(error){
        console.log(error.message)
        res.json({succes:true, message:error.message})

    }
}

const getUserCart=async (req,res)=>{
    try{
        const {userId}=req.body
      
    userData= await userModel.findById({_id:userId.id})
   
    let cardData=userData.cartData
    console.log()
    res.json({succes:true, cardData})
    }
    catch(error){
        res.json({succes:true, message:error.message})
    }
    
}

module.exports={addToCard,updateCard, getUserCart}