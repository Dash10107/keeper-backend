require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const connection = require("./db");
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
const cors = require("cors");
const path = require("path");



app.use(cors());
app.use(express.json());

// Database connect
connection();

// Routes
const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/client/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }



let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

// Listen
app.listen(port, () => {
  console.log(`Server is connected successfully and running on port: ${port}`);
});