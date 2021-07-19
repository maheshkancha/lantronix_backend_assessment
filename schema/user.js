const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    token: String
});

module.exports = User = new mongoose.model('User', userSchema);