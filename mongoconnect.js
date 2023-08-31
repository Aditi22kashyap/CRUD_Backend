const mongoose = require('mongoose');
const MongoConnect = async ()=>{
   await mongoose.connect('mongodb+srv://aditikashyapofficial11:mern1@cluster0.cbxhdlr.mongodb.net/mernassignment1?retryWrites=true&w=majority');
   console.log("mongodb connected");
 }
 module.exports  = {
    MongoConnect
 }