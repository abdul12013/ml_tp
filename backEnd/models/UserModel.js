const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name:{type:String,
            required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData: {
        type: Object,   // Change this to Object instead of an array
        default: {}
    }


},{minimize: false })

module.exports=mongoose.model('user',UserSchema)