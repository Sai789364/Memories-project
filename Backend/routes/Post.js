const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const posts = require('../models/Post.js');



router.get("/fetchallposts", async (req, res) => {
  try {
    const post = await posts.find();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/addpost",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
    body("images")
      .isArray()
      .withMessage("Images must be an array")
  ],
  async (req, res) => {
    try {
      const { title, description, images } = req.body;
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = new posts({
        title,
        description,
        images,
        user: req.user.id,
      });

      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);


router.put("/updatepost/:id", fetchuser, async (req, res) => {
  const { title, description, images } = req.body;
  const newPost = {};

  if (title) {
    newPost.title = title;
  }
  if (description) {
    newPost.description = description;
  }
  if (images) {
    newPost.images = images;
  }

  try {
    let post = await posts.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    post = await posts.findByIdAndUpdate(
      req.params.id,
      { $set: newPost },
      { new: true }
    );

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, images } = req.body;
    let post = await posts.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    post = await posts.findByIdAndDelete(req.params.id);

    res.json({ success: "Post has been deleted", post });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
