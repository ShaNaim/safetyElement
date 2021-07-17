const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const expressLayouts = require("express-ejs-layouts");

// Declarations
const app = express();
const PORT = process.env.PORT || 3000;

//Initialize
app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// View Engine

app.set("view engine", "ejs");
app.use(expressLayouts);

//DB Connect + surver Start
const dbURL = "mongodb://localhost:27017/safetyelement";
mongoose
  .connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => app.listen(PORT, console.log(`Server Started on ${PORT}`)))
  .catch((error) =>
    console.log(`Server Stopped With the follwing Error ${error}`)
  );
