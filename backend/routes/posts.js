const express = require('express');
const Post = require("../models/post");

const router = express.Router();

router.get('', (req, res, next) => {
    // const posts =  [
    //     {
    //       "title": "Title 1",
    //       "content": "Server returining post1",
    //       "id": 'jshduh1223'
    //     },
    //     {
    //       "title": "Title 2",
    //       "content": "Server returining post1",
    //       "id": 'hsdhdj445'
    //     }
    //   ];

    Post.find()
      .then(posts => {
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: posts
        });
      })
      .catch(err => {

      });

});

router.get('/:id', (req, res, next) => {
  Post.findById({_id: req.params.id})
    .then(post => {
      console.log("EDIT ------->   ", post);
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({
          message: "Post is not avaiable!"
        })
      }
    })
});

router.post('', (req, res, next) => {
    //const post = req.body;
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    })
    post.save()
      .then((data) => {
        console.log(data);
        res.status(201).json({
            message: 'Posts Added Successfully!',
            postID: data._id
        });
      })
})

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(data => {
      res.status(200).json({
        message: "Post Deleted Successfully!"
      })
    })
});

router.put('/:id', (req, res, next) => {
  const updatedPost = {
    title: req.body.title,
    content: req.body.content
  };
  
  Post.updateOne({_id: req.body.id}, updatedPost)
    .then((data) => {
      res.status(200).json({
        message: "Post Updated Successfully!",
        post: data
      })
    })
});

module.exports = router;

