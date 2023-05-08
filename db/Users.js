const mongoose = require('mongoose')



const userSehema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});


module.exports = mongoose.model('Users',userSehema)