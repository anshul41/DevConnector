const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Posts');

//@route api/posts
//@desc Post Create post
//@access private
router.post(
  '/',
  [auth, [check('text', 'text is required').not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { text } = req.body;
      const user = await User.findOne({ _id: req.user.id }).select('-password');
      const post = new Post({
        user: req.user.id,
        text,
        name: user.name,
        avatar: user.avatar,
      });
      const newPost = await post.save();
      res.json(newPost);
    } catch (err) {
      res.status(400).json({ msg: 'server error' });
    }
  }
);

//@route Get api/posts
//@desc get all posts
//@access private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(ree.message);
    res.status(400).json({ msg: 'server error' });
  }
});

//@route Get api/posts/:id
//@desc get all posts
//@access private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ msg: 'post not found' });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'post not found' });
    }
    res.status(400).json({ msg: 'server error' });
  }
});

//@route Gelete api/posts/:id
//@desc delete post
//@access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'user not authorized' });
    }
    await post.remove();
    return res.json({ msg: 'post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'post not found' });
    }
    res.status(400).json({ msg: 'server error' });
  }
});

//@route Put api/posts/like
//@desc like update
//@access private

router.put('/like/:postId', auth, async (req, res) => {
  try {
    let isfound = false;
    const post = await Post.findById(req.params.postId);
    post.likes.forEach((element, index) => {
      if (element.user.toString() === req.user.id) {
        post.likes.splice(index, 1);
        isfound = true;
      }
    });
    if (!isfound) {
      post.likes.push({ user: req.user.id });
    }
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      res.status(404).json({ msg: 'post not found' });
    }
    res.status(400).json({ msg: 'server error' });
  }
});

//@route api/posts/comment/:id
//@desc Post Create post
//@access private
router.post(
  '/comment/:id',
  [auth, [check('text', 'text is required').not().isEmpty()]],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const { text } = req.body;
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const comment = {
        text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
      };
      post.comments.unshift(comment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      res.status(400).json({ msg: 'server error' });
    }
  }
);

//@route api/posts/comment
//@desc Delete comment
//@access private
router.delete('/comment/:postId/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    const comment=post.comments.find(comment => comment.id === req.params.commentId);
    console.log(req.user.id,comment)
    if(!comment)
    {
      return res.status(404).json({ msg: 'Comment not exists' });
    }
    if(req.user.id !== comment.user.toString())
    {
      return res.status(401).json({ msg: 'Unauthorized access'});
    }
    post.comments.forEach((element, index) => {
      if (element.id.toString() === req.params.commentId) {
        post.comments.splice(index, 1);         
      }
    });
    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.status(400).json({ msg: 'server error' });
  }
});
module.exports = router;
