const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
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
  post_id: {
    type: String,
    required: true,
  },
  replies_count: {
    type: Number,
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
  Comment,
};
