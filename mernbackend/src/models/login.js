const mongoose = require("mongoose");
// var session = require('express-session');

const loginSchema = new mongoose.Schema({

    email: {
        type: String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        requried: true
    }
})

// now we need to create a collections

const Login = new mongoose.model("Login", loginSchema);

module.exports = Login;