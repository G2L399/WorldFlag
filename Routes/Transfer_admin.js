const express = require(`express`);
/** initiate object that instance of express */
const app = express();
const Transfer = require(`../Controllers/Transfer_admin`);

app.post("/", Transfer.transfer);
app.post("/remove/:id", Transfer.remove)

module.exports = app;
