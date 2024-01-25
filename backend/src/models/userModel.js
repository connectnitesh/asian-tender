const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    company: String,
    password: String,
    role: String,
    subscription: Boolean
});

const User = mongoose.model('User', userSchema);
module.exports = User;