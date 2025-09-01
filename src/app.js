const express=require('express')
const mongoose=require('mongoose')
const userRoutes=require('./routes/authRoutes')
const app=express()

//Pour permettre de parser et utiliser le methode POST
app.use(express.json())

//routes
app.use('/api/auth',userRoutes)


module.exports=app