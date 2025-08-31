const http=require('http')

require('dotenv').config()

const PORT= process.env.PORT || 3000

const app=require('./src/app')

const server=http.createServer(app)

const connectDB=require('./src/config/db')


connectDB().then(()=>{
    server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
    })
})
