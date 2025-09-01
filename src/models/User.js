const mongoose=require('mongoose')

const uniqueValidator=require('mongoose-unique-validator')

const userSchema=mongoose.Schema({
    username:{type:String , required:true , unique:true},
    email:{type:String , required:true, unique:true},
    password:{type:String, required:true},
    createdAt:{type:Date, default:Date.now},
    role:{type:String, default:"user"},
    isActive:{type:Boolean,default:true},
})

userSchema.plugin(uniqueValidator)

module.exports=mongoose.model('User',userSchema)