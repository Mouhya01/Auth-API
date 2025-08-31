const express=require('express')

const app=express()

app.use(express.json())

app.get('/api/ping',(req,res,next)=>{
    res.status(200).json({message: "Votre serveur marche correctement !!!"})
})

module.exports=app