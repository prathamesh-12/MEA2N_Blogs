const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRouter = require("./routes/posts");

const app = express();

//ATLAS Database connect
mongoose.connect("mongodb://localhost:27017/MEA2N-Blogs", {useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect("mongodb+srv://prat:P@55w0rd@cluster1-4wapk.mongodb.net/MEA2N-Blogs?retryWrites=true&w=majority", {useNewUrlParser: true})
  .then(() => {
    console.log("databse connected");
  })
  .catch(() => {
    console.log("Error in connecting to database");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//handling CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/posts", postsRouter);



module.exports = app;