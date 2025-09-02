const express=require('express')

const router=express.Router()

const userControllers=require('../controllers/authController')

const authMiddleware = require('../middleware/authMiddleware');



// Une route protégée (accessible seulement avec token valide)
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenue dans ton profil !', user: req.user });
});


//Route pour le signup
router.post('/signup',userControllers.signup)
router.post('/login',userControllers.login)


//exportation du router
module.exports=router