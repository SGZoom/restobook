const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
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
  comment_id: {
    type: String,
    required: true,
  },
});

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = {
  Reply,
};
