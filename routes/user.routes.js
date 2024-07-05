const express=require('express')
const router=express.Router()
const auth = require("../middleware/auth")

const { getLogin ,login, getSignup, signup,getUserProfile }=require('../controller/user.controller')

router.get('/signup',getSignup)
router.post('/signup',signup)
router.get('/login',getLogin)
router.post('/login',login)
router.get('/profile' , auth ,getUserProfile)












module.exports=router