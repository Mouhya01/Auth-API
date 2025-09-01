const express=require('express')

const Router=express.Router()

const userControllers=require('../controllers/authController')

//Route pour le signup
Router.post('/signup',userControllers.signup)
Router.post('/login',userControllers.login)


//exportation du router
module.exports=Router