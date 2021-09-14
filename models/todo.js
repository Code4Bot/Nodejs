const mongoose = require('mongoose');

let todoScheme = new mongoose.Schema({
    name : String,
    status : String
});

module.exports = mongoose.model('Todo', todoScheme);