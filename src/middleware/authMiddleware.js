const jwt=require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    //1. Récuperer le header Authorization
    const authHeader=req.headers['authorization']

    //2. Vérifier si le header existe et commence par "Bearer"
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'Accés refusé: Token manquant'})
    }

    //3. Extraire le token (aprés "Bearer")
    const token= authHeader.split('')[1]

    //4. Vérifier le token
    jwt.verify(token,process.env.JWT_SECRET, (err,decoded)=>{
        if (err) {
            return res.status(401).json({message: 'Token invalide ou expirée'})
        }

        //5. Attacher les infos du user a la requete
        req.user=decoded
        next()
    })  
}

module.exports=authMiddleware

