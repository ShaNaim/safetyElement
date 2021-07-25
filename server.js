const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

// Declarations

const app = express();
const PORT = process.env.PORT || 3000;

// MiddleWare

const { checkUser, requireGuest } = require("./middleWare/authMiddleware");

//Routers

const homeRouter = require("./Routes/homeRouter");
const authRouter = require("./Routes/authRouter");
const productRouter = require("./Routes/productRouter");
const adminRouter = require("./Routes/adminRouter");
const userRouter = require("./Routes/userRouter");
const errorRouter = require("./Routes/errorRouter");

//Initialize;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/css", express.static(path.join(__dirname + "public/css")));
app.use("/js", express.static(path.join(__dirname + "public/js")));
app.use("/images", express.static(path.join(__dirname + "public/images")));

app.use(cookieParser());

// View Engine

app.use(expressLayouts);
app.set("views", path.join(__dirname, "view"));
app.set("layout", "layouts/layout.ejs");
app.set("view engine", "ejs");

//DB Connect + surver Start

const dbURL = "mongodb://localhost:27017/safetyelement";
mongoose
  .connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) =>
    app.listen(PORT, console.log(`Server Started on Port : ${PORT}`))
  )
  .catch((error) =>
    console.log(`Server Stopped With the follwing Error ${error}`)
  );

//Middleware
app.use(checkUser);

//Routes
app.use(homeRouter);
app.use(authRouter);
app.use(productRouter);
app.use(userRouter);
// app.use("/admin", adminRouter);
// app.use(errorRouter);
