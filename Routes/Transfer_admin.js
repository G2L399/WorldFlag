const express = require(`express`);
/** initiate object that instance of express */
const app = express();
const Transfer = require(`../Controllers/Transfer_admin`);
const multer = require(`multer`);
const storage = multer.memoryStorage(); // Store files in memory (you can configure it to store in disk)
const upload = multer({ storage: storage });
app.post("/",upload.single("pp"), Transfer.transfer);
app.post("/remove/:id", Transfer.remove)

module.exports = app;
