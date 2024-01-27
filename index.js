/** load library express */
const express = require(`express`);
/** create object that instances of express */
const app = express();
/** define port of server */
const PORT = 8000;
/** load library cors */
const cors = require(`cors`);
/** open CORS policy */
app.use(cors());
/** define all routes */
const FlagsRoute = require(`./Routes/Flags_Route`);
const Sign_Up_Route = require(`./Routes/Sign_up`);
const Login = require(`./Routes/Login`);
const auth = require(`./Routes/Auth`)
/** define prefix for each route */
app.use(`/Flags`, FlagsRoute);
app.use(`/Sign_Up`, Sign_Up_Route);
app.use(`/Login`, Login);
app.use(`/auth`, auth);
/** run server based on defined port */
app.listen(PORT, () => {
  console.log(`Server of FlagShop runs on port
    ${PORT}`);
});