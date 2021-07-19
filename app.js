const express = require('express');
const morgan = require('morgan');
const userRepo = require('./repo/user');

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));

// API for "REGISTER"
app.post('/user/register', async (req, res) => {
    console.log('API: register()');
    const response = await userRepo.registerUser(req.body);
    console.log('Register Response:', response);
    res.send(response);
})

// API for "LOGIN"
app.post('/user/login', async (req, res) => {
    console.log('API: login()');
    const response = await userRepo.authenticateUser(req.body);
    res.send(response);
})

module.exports = app;
