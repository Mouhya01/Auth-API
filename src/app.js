const express=require('express')
const mongoose=require('mongoose')
const userRoutes=require('./routes/authRoutes')
const app=express()

const errorMiddleware = require('./middleware/errorMiddleware');

//Pour permettre de parser et utiliser le methode POST
app.use(express.json())

//routes
app.use('/api/auth',userRoutes)

// Middleware pour gérer les routes inexistantes (404)
app.use((req, res, next) => {
  const error = new Error(`Route non trouvée : ${req.originalUrl}`);
  error.status = 404;
  next(error);
});



app.use(errorMiddleware);
module.exports=app