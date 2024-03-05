/** load library express */
const express = require(`express`);
/** initiate object that instance of express */
const app = express();
/** allow to read 'request' with json type */
const multer = require(`multer`);
const storage = multer.memoryStorage(); // Store files in memory (you can configure it to store in disk)
const upload = multer({ storage: storage });

/** load member's controller */
const FlagsController = require(`../Controllers/Flags_Controller`);
/** create route to get data with method "GET" */
app.get("/", FlagsController.GetFlags);
app.get("/:id", FlagsController.GetFlagsByID);
app.post("/", upload.single("flags"), FlagsController.InsertFlag);
app.delete("/:id", FlagsController.DeleteFlag);
app.delete("/", FlagsController.DeleteAllFlag);
app.put("/:id", upload.single("flags"), FlagsController.UpdateFlag);
/** export app in order to load in another file */
module.exports = app;
