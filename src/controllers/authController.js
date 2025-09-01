
const User=require('../models/User')
//pour le hackage du mot de passe
const bcrypt=require('bcrypt')
//pour la creation de token d'identification
const jwt=require('jsonwebtoken')

exports.signup=(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
        .then(hash=>{
            const user=new User({
                email:req.body.email,
                username:req.body.username,
                password:hash,
                createdAt:new Date()
            })
            user.save()
                .then(()=>{
                    res.status(201).json({message:"Nouvelle Utilisateur crée avec succés!!"})
                })
                .catch((error)=>{res.status(400).json({error})})
        })
        .catch((error)=>{
            res.status(500).json({error})
        })
}

exports.login=(req,res,next)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                res.status(401).json({message:"Utilisateur non trouvée!!"})
            }
            bcrypt.compare(req.body.password,user.password)
                .then(valid=>{
                    if(!valid){
                        res.status(401).json({message:"Paire identifiant/mot de passe invalid"})
                    }else{
                        res.status(200).json({
                            user_id:user._id,
                            token:jwt.sign(
                                {userID:user._id},
                                process.env.JWT_SECRET,
                                {expiresIn: "24h"}
                            )
                        })
                    }
                })
                .catch((error)=>{res.status(401).json({error})})
        })
        .catch((error)=>{res.status(401).json({message:"Utilisateur non trouvée!!"})})
}
