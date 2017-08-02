const Comment = require('../models/Comment').Comment;
const config = require('../../config');
const jwt = require('jsonwebtoken');

function buildQuery(queryParams = {}, params = {}) {
  const { max_time: maxTime } = queryParams;
  const { post_id: postId } = params;
  const query = {};

  if (maxTime) {
    query.created_at = {
      $lt: maxTime,
    };
  }

  if (postId) {
    query.post_id = postId;
  }

  return query;
}

function fetchPaginationDetails() {
  return new Promise((resolve, reject) => {
    Comment.count({}, (err, count) => {
      if (err) {
        reject(new Error(err));
      }

      resolve(count);
    });
  });
}

function fetchComments(query, count) {
  return new Promise((resolve, reject) => {
    Comment
      .find(query)
      .sort({
        created_at: '-1',
      })
      .limit(parseInt(count, 10))
      .exec((err, comments) => {
        if (err) {
          reject(new Error(err));
        }

        resolve(comments);
      });
  });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        reject(new Error('Invalid token'));
      }

      resolve(decoded && decoded.username);
    });
  });
}

function validateCommentCreation(text, author, postId) {
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

  if (!postId) {
    return {
      fail: true,
      msg: 'No post to attach comment to',
      statusCode: 400,
    };
  }

  return {
    fail: false,
  };
}

function saveComment(text, author, postId) {
  return new Promise((resolve, reject) => {
    Comment
      .create({
        text,
        username: author,
        post_id: postId,
        created_at: new Date(),
      }, (err, comment) => {
        if (err) {
          reject(new Error(err));
        }

        resolve(comment);
      });
  });
}

module.exports = {
  getComments: (request, response) => {
    const query = buildQuery(request.query, request.params);
    let pagination;

    fetchPaginationDetails()
      .then((total) => {
        pagination = {
          count: request.query.count || 25,
          total,
        };
        return fetchComments(query, pagination.count);
      })
      .then((comments) => {
        response.status(200).json({
          pagination,
          post_id: request.params.post_id,
          comments,
        });
      })
      .catch((err) => {
        response.status(500).json(err);
      });
  },
  createComment: (request, response, next) => {
    const { text } = request.body;
    const { post_id: postId } = request.params;
    verifyToken(request.headers.authorization && request.headers.authorization.split(' ')[1])
      .then((author) => {
        const isValid = validateCommentCreation(text, author, postId);

        if (isValid.fail) {
          response.status(isValid.statusCode).json({
            msg: isValid.msg,
          });
          next();
        }
        return saveComment(text, author, postId);
      })
      .then((comment) => {
        response.status(201).json({
          post_id: postId,
          comment,
        });
      })
      .catch((err) => {
        response.status(500).json(err.message);
      });

    return null;
  },
};
