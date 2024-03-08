/** load library express */
const express = require(`express`);
/** load library express-session */
const session = require("express-session");
/** create object that instances of express */
const app = express();
/** define port of server */
const PORT = 8000;
/** load library cors */
const cors = require(`cors`);
/** open CORS policy */
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware
app.use(
  session({
    secret: "fftyyt",
    resave: false,
    saveUninitialized: false,
  })
);

/** define all routes */
const FlagsRoute = require(`./Routes/Flags_Route`);
const Sign_Up_Route = require(`./Routes/Sign_up`);
const Login = require(`./Routes/Login`);
const Transfer = require("./Routes/Transfer_admin")
const Cart = require("./Routes/Cart");
const buy = require("./Routes/Buy");
const auth = require("./Routes/auth.route");

/** define prefix for each route */
app.use(`/Flags`, FlagsRoute);
app.use(`/Sign_Up`, Sign_Up_Route);
app.use(`/Login`, Login);
app.use("/Transfer", Transfer);
app.use("/Cart",Cart)
app.use("/buy",buy)
app.use("/auth",auth)

/** run server based on defined port */
app.listen(PORT, () => {
  console.log(`Server of FlagShop runs on port ${PORT}
http://localhost:${PORT}`);
});
