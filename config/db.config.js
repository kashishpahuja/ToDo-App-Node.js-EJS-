const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/todoist')

const db=mongoose.connection

db.on('open',()=>{
    console.log('database connected')
})

db.on('error',(err)=>{
    console.log('error while connecting to database ',err)
})