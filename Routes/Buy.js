const express = require('express');
const app = express();

const Cart = require('../Controllers/User_transaction')
const authorize = require(`./../Controllers/auth.controller`);
const user = require('./../Controllers/User_transaction')


app.post("/",authorize.authorize,Cart.buy)
app.get("/",authorize.authorize,Cart.History)
app.get("/topup",authorize.authorize,user.topup)
module.exports = app;