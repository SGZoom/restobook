const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  comments_count: {
    type: Number,
    required: true,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = {
  Post,
};
