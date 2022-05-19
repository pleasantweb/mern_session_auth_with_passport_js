require('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbConn')
const authRoutes = require('./routes/api/auth-routes')
const initializePassport =require('./config/passport-setup')
const {corsOptions} = require('./config/corsOptions')
const app = express()
const PORT = process.env.PORT || 3500
connectDB()

//middlewares 
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors(corsOptions))

//passport auth
initializePassport(passport)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(passport.initialize())
app.use(passport.session())


// api routes
app.use('/auth',authRoutes)



app.get('/',(req,res)=>{
    res.send('hello world')
})

mongoose.connection.once('open',()=>{
    console.log('connected to mongoose');
})
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})