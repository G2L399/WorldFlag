const express = require(`express`);
/** initiate object that instance of express */
const app = express();
const Transfer = require(`../Controllers/Transfer_admin`);

app.post("/:id", Transfer.transfer);

module.exports = app;
