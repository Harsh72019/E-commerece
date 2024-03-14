const express = require("express");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const cookiePaser = require("cookie-parser");
const fileUpload = require("express-fileupload");


const app = express();

app.use(express.json());
app.use(cookiePaser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


// Router imports
const product = require("./routes/productRoutes");
const order = require("./routes/orderRoutes");

const user = require("./routes/userRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// middleware for Errors;

app.use(errorMiddleware);

module.exports = app;
