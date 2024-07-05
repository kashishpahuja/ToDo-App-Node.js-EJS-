const User=require('../model/user.model.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const privateKey='mySecretKey'
const Todo=require('../model/todo.model.js')

function getLogin(req,res){
    const user=req.cookies.token
    if(!user){
        res.render('login.ejs')
    }
    res.redirect('/todo')
}

async function login(req,res){
    const {username,password}=req.body
    const user=await User.findOne({username:username})
    if(!user){
        return res.json({message:"user not found"})
    }
    const checkPassword= await bcrypt.compare(password,user.password)
    if(!checkPassword){
        return res.json({message:"incorrect Password"})   
    }
    const SecretData={_id:user._id,email:user.email,username:user.username}
    const token= jwt.sign(SecretData,privateKey)
    res.cookie('token',token,{maxAge:1000*60*60*24*2,http:true})
    res.redirect('/todo') 
}

function getSignup(req,res){
    const user=req.cookies.token
    if(!user){
        res.render('signup.ejs')
    }
    res.redirect('/todo')
}

async function signup(req,res){
    const{username,password,email}=req.body
    const user=await User.findOne({username:username})
    if(user){
        return res.json({message:"username already taken"})
    }
    const userEmail=await User.findOne({email:email})
    if(userEmail){
        return res.json({message:"email already exists"})
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)

    const userResult= await User.create({username,email,password:hashedPassword})
    const SecretData={_id:userResult._id,email:userResult.email,username:userResult.username}
    const token=jwt.sign(SecretData,privateKey)
    res.cookie('token',token,{maxAge:1000*60*60*24*2,http:true})
    res.redirect('/todo')
}

async function getUserProfile(req , res) {
    const user = await User.findOne({ _id : req.user._id })
    const todos = await Todo.find({ user : req.user._id  })
    res.render('profile.ejs' , { user : user , todos : todos  })
}



module.exports={login ,getLogin, signup,getSignup,getUserProfile}