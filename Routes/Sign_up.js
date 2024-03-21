/** load library express */
const express = require(`express`)
/** initiate object that instance of express */
const app = express()
/** allow to read 'request' with json type */
app.use(express.json());

/** load member's controller */
const SU_Controller =
require(`../Controllers/Sign_up`)
/** create route to get data with method "GET" */
app.post("/", SU_Controller.SIGN_UP)
app.delete("/DeleteAcc", SU_Controller.DeleteAcc)
app.put("/reset", SU_Controller.ResetPassword)
app.post("/PIN", SU_Controller.ForgotPasswordPin)
app.put("/ChangePassword", SU_Controller.ForgotPasswordChange)
/** export app in order to load in another file */
module.exports = app