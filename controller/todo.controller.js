const Todo=require('../model/todo.model.js')
const User = require('../model/user.model.js')

async function getTodos(req,res){
    const todo=await Todo.find({user:req.user._id})
    res.render('todo.ejs',{todos:todo, username:req.user.username})
}

async function getSingleTodo(req,res){
    const {id}=req.params
    const todo=await Todo.findOne({_id:id})
    res.render('singleTodo.ejs',{todo:todo.todo,id:todo._id,username:todo.username,status:todo.status,createdAt:todo.createdAt,updatedAt:todo.updatedAt})
}

async function addTodo(req,res){
    const{task,setPublic}=req.body
    let isPublic = setPublic=='on'? true:false
    await Todo.create({todo:task,isPublic:isPublic, user:req.user._id})
    res.redirect('/todo')
}

async function updateTodo(req,res){
    const {id}=req.params
    const {task,status}=req.body
    let statusValue=status=='on'?true:false
    let item=await Todo.updateOne({_id:id},{todo:task,status:statusValue})
    res.redirect('/todo')
}

async function getPublicTodos(req,res){
    const todos=await Todo.find({isPublic:true}).populate('user')
    res.render('publicTodos',{todos:todos,username:req.user.username})
}
async function deleteTodo(req,res){
    const {id}=req.params
    const todo=await Todo.deleteOne({_id:id})
    res.redirect('/todo')
}
function getSearch(req,res){
    res.render('search.ejs',{username:req.user,todos:null,query:null})
}

async function postSearch(req , res){
    const { query } = req.body
    const todos = await Todo.find( { "$and" : [{ isPublic : true } , { "$text" : { "$search" : query }} ]})
    res.render("search.ejs" , { username : req.user.username ,  todos : todos , query : query })
}


module.exports={ getTodos, getSingleTodo, addTodo,updateTodo,getPublicTodos,deleteTodo, postSearch, getSearch}