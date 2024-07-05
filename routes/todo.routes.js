const express=require('express')
const router=express.Router()


const { getTodos, getSingleTodo, addTodo,updateTodo,getPublicTodos,deleteTodo , postSearch, getSearch}=require("../controller/todo.controller.js")

router.get('/',getTodos)
router.get('/id/:id',getSingleTodo)
router.get('/all',getPublicTodos)
router.get('/delete/:id',deleteTodo)
router.post('/',addTodo)
router.post('/update/:id',updateTodo)
router.route('/search').get(getSearch).post(postSearch)




module.exports=router