/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */
app.use(express.json());

/** load member's controller */
const Login =
require(`../Controllers/Login`)
/** create route to get data with method "GET" */
app.post("/", Login.login)
/** export app in order to load in another file */
module.exports = app