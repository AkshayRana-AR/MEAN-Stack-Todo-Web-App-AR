//This is an routing file that routes various api calls
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../db/conn');
const todosModel = require('../models/todosModel');

router.get('/getTodos', (req, res) => {                                       //Get all todos
   todosModel.find((err, result) => {
      if (err) throw err;
      res.send(result);
   });
});

router.get('/getTodo/:id', (req, res) => {                                    //Get a Todo
   todosModel.find({ _id: req.params.id }, (err, result) => {
      if (err) res.status(404).send("<h1>Invalid Request</h1>");
      else {
         res.send(result);
      }
   });
});

router.post('/addTodo', (req, res) => {                                          //Add a Todo
   const todo = new todosModel(req.body);
   todo.save((err, result) => {
      if (err) throw err;
      console.log("Data Saved!");
      res.send(todo);
      console.log(result);
   });
});

router.patch('/updateTodo/:id', (req, res) => {                                  //Update a Todo
   todosModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {            //new true so that we can get new updated data in result
      if (err) throw err;
      console.log(result);
      res.send(result);
   });
});

router.delete('/deleteTodo/:id', (req, res) => {                                 //Delete a Todo
   todosModel.deleteOne({ _id: req.params.id }, (err, result) => {               //or findByIdAndDelete() method 
      if (err) throw err;
      console.log(result);
      res.send(result);
   })
});

module.exports = router;