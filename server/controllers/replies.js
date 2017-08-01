const Reply = require('../models/Reply');
const config = require('../../config');
const jwt = require('jsonwebtoken');

function buildQuery(queryParams = {}, params = {}) {
  const { max_time: maxTime } = queryParams;
  const { comment_id: commentId } = params;
  const query = {};

  if (maxTime) {
    query.created_at = {
      $lt: maxTime,
    };
  }

  if (commentId) {
    query.comment_id = commentId;
  }

  return query;
}

function fetchPaginationDetails() {
  return new Promise((resolve, reject) => {
    Reply.count({}, (err, count) => {
      if (err) {
        reject(new Error(err));
      }

      resolve(count);
    });
  });
}

function fetchReplies(query, count) {
  return new Promise((resolve, reject) => {
    Reply
      .find(query)
      .sort({
        created_at: '-1',
      })
      .limit(count)
      .exec((err, replies) => {
        if (err) {
          reject(new Error(err));
        }

        resolve(replies);
      });
  });
}

function verifyToken(token) {
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return null;
    }

    return decoded && decoded.username;
  });
}

function validateReplyCreation(text, author, commentId) {
  if (!text) {
    return {
      fail: true,
      msg: 'No text',
      statusCode: 400,
    };
  }

  if (!author) {
    return {
      fail: true,
      msg: 'No author',
      statusCode: 400,
    };
  }

  if (!commentId) {
    return {
      fail: true,
      msg: 'No comment to attach reply to',
      statusCode: 400,
    };
  }

  return {
    fail: false,
  };
}

function saveReply(text, author, commentId) {
  return new Promise((resolve, reject) => {
    Reply
      .create({
        text,
        username: author,
        post_id: commentId,
        created_at: new Date(),
      })
      .exec((err, reply) => {
        if (err) {
          reject(new Error(err));
        }

        resolve(reply);
      });
  });
}

module.exports = {
  getReplies: (request, response) => {
    const query = buildQuery(request.query, request.params);
    let pagination;

    fetchPaginationDetails()
      .then((total) => {
        pagination = {
          count: request.query.count || 25,
          total,
        };
        return fetchReplies(query, pagination.count);
      })
      .then((replies) => {
        response.status(200).json({
          pagination,
          comment_id: request.params.comment_id,
          replies,
        });
      })
      .catch((err) => {
        response.status(500).json(err);
      });
  },
  createReply: (request, response) => {
    const { text } = request.body;
    const author = request.headers.authorization && verifyToken(request.headers.authorization.split(' ')[1]);
    const { comment_id: commentId } = request.params;
    const isValid = validateReplyCreation(text, author, commentId);

    if (isValid.fail) {
      response.status(isValid.statusCode).json({
        msg: isValid.msg,
      });

      return null;
    }

    saveReply(text, author, commentId)
      .then((reply) => {
        response.status(201).json({
          comment_id: commentId,
          reply,
        });
      })
      .catch((err) => {
        response.status(500).json(err);
      });

    return null;
  },
};
