const express = require('express');
const app = express();

const Cart = require('../Controllers/User_transaction')

app.post("/:idProduct",Cart.addCart)
app.delete("/",Cart.deleteAllCart);
app.delete("/:idProduct",Cart.DeleteItemFromCart);
app.put("/:idProduct",Cart.ChangeQuantity);
app.get("/",Cart.SeeCart);
module.exports = app;