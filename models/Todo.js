const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: String,
    time: String,
    priority: String,
    isRepeating: Boolean,
    notes: String,
    attachment: String,
    link: String
});

module.exports = mongoose.model('Todo', todoSchema);
