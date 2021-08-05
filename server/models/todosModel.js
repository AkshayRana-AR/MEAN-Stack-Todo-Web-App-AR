//This file contains Schema of the api is defined
const mongoose = require('mongoose');
const validator = require('validator');

const todoSchema = new mongoose.Schema({                    //Todo Schema
    title: {                                                //title field
        type: String,
        required: true
    },
    description: {                                          //description field
        type: String,
        required: true
    },
    endDate: {                                              //endDate field
        type: String,
        required: true,
        /*validate(value){
            if(!validator.isAfter(value,new Date().toDateString()))         //Here, today's date is not getting applied
            {
                throw new Error("Invalid Date");
            }
        }*/
    },
    status: {                                               //status field
        type: String,
        required: true
    }
});

//New Collection - todos
module.exports = mongoose.model("Todo", todoSchema);