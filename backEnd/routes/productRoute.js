const express=require('express')
const upload=require('../middlewere/multer')

const{addProduct,removeProduct,listProduct,singleProduct}=require('../controlers/productController')
const productRouter=express.Router();
const adminAuth=require("../middlewere/adminAuth")
// apis for product
productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1}, {name:'image4',maxCount:1}]),addProduct)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post('/single',singleProduct)
productRouter.get('/list',listProduct)

module.exports=productRouter