const express = require('express');
const app = express();

const Cart = require('../Controllers/User_transaction')

app.post("/",Cart.buy)
app.get("/",Cart.History)
module.exports = app;