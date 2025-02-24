const claudinary=require('cloudinary').v2
// const { json } = require('express')
const productModel= require('../models/productModel')
// function for add product
const addProduct=async (req,res)=>{
    try{
        const{name,description,prize,category,subCategory,sizes, bestseller}=req.body
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=> item !==undefined)

        let imageUrl=await Promise.all(
        images.map(async (item)=>{
            let results= await claudinary.uploader.upload(item.path,{resource_type:'image'})
            return results.secure_url
        })
        )

        const product= await productModel.create({
            name,
            description,
            prize,
            category,
            subCategory,

            sizes:JSON.parse(sizes),
            bestseller: bestseller === 'true' ? true : false,
            image: imageUrl,
            date:Date.now()

        })


        return res.json({success:true,message:"product added successfully "})

    }
    catch(error){
        res.json({success:false, message:error.message})
    }

}

// listing the product 
const listProduct=async (req,res)=>{
    try{
        const products= await productModel.find({})
        return res.json({success:true,products})
    }
    catch(error){
        res.json({success:false, message:error.message})
    }

}
// delete the product
const removeProduct= async (req,res)=>{
    try{
        //deleting the products 
        await productModel.findOneAndDelete({_id:req.body.id})
        return res.json({success:true, message:"deleted successfully"})

    }
    catch(error){
        res.json({success:false, message:error.message})
    }

}

// get single Product info
const singleProduct= async(req,res)=>{

    try{
        const product =await productModel.findOne({_id:req.body.id})
        return res.json({success:true,product})

    }
    catch(error){
        res.json({success:false, message:error.message})
    }

}

module.exports={addProduct,removeProduct,listProduct,singleProduct}