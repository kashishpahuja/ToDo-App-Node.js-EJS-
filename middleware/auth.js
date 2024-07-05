const jwt=require('jsonwebtoken')

function auth(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.redirect('/user/login')
    }
    const decoded=jwt.decode(token)
    req.user=decoded
    next()
}

module.exports=auth