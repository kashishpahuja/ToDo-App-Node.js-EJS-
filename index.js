const express=require("express")
const app=express()
const db=require('./config/db.config.js')
const auth=require('./middleware/auth.js')
const path=require('path')
const cookieParser= require('cookie-parser')
const port=2200

// absolute path of directory
let staticPath=path.join(__dirname,'public')
app.use(express.static(staticPath))
// set view engine
app.set('view engine','ejs')

// Use middleware
app.use(express.json())
app.use(cookieParser())
const bodyparser=require("body-parser")               //input data collection
app.use(express.urlencoded({extended:false}))



app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.get('/logout',(req,res)=>{
    res.cookie("token","")
    res.redirect('/user/login')
})

app.use('/todo',auth, require('./routes/todo.routes.js'))
app.use('/user', require('./routes/user.routes.js'))




app.listen(port,()=>{
    console.log(`click here http://localhost:${port}`)
})