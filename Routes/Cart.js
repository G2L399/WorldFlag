const express = require('express');
const app = express();

const Cart = require('../Controllers/User_transaction')
const authorize = require(`./../Controllers/auth.controller`);

app.post("/:idProduct",authorize.authorize,Cart.addCart)
app.delete("/",authorize.authorize,Cart.deleteAllCart);
app.delete("/:idProduct",authorize.authorize,Cart.DeleteItemFromCart);
app.put("/:idProduct",authorize.authorize,Cart.ChangeQuantity);
app.get("/",authorize.authorize,Cart.SeeCart);
module.exports = app;