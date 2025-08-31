const mongoose=require('mongoose')

const connectDB= ()=>{
    return mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log('Connexion a MongoDB réussie!!')

        })
        .catch((error)=>{
            console.log('Connexion a MongoDB échouée:',error.message)

        })

}
module.exports= connectDB