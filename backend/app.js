const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Post = require("./models/post");

const app = express();

//ATLAS Database connect
mongoose.connect("mongodb+srv://prat:P@55w0rd@cluster1-4wapk.mongodb.net/MEA2N-Blogs?retryWrites=true&w=majority", {useNewUrlParser: true})
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

app.get('/api/posts', (req, res, next) => {
    const posts =  [
        {
          "title": "Title 1",
          "content": "Server returining post1",
          "id": 'jshduh1223'
        },
        {
          "title": "Title 2",
          "content": "Server returining post1",
          "id": 'hsdhdj445'
        }
      ];

      res.status(200).json({
          message: 'Posts fetched successfully!',
          posts: posts
      });
});

app.post('/api/posts', (req, res, next) => {
    //const post = req.body;
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    })
    console.log(":POST ===>   ", post);
    res.status(201).json({
        message: 'Posts Added Successfully!'
    });
})

module.exports = app;