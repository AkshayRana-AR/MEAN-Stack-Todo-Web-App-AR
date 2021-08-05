//This file is intended for connecting to Mongodb Database
const mongoose = require('mongoose')

//const url = "mongodb://localhost:27017/todoList";           //Mongodb Database URL
const url="mongodb+srv://akshay:akshay@cluster0.8uvcj.mongodb.net/TodoList?retryWrites=true&w=majority";        //Atlas Remote DB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const con = mongoose.connection;
con.on('open', () => { console.log("Connected to MongoDB Successfully!") });