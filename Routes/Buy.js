const express = require('express');
const app = express();

const Cart = require('../Controllers/User_transaction')
const authorize = require(`./../Controllers/auth.controller`);


app.post("/",authorize.authorize,Cart.buy)
app.get("/",authorize.authorize,Cart.History)
module.exports = app;