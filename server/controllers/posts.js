const Post = require('../models/Post').Post;
const config = require('../../config');
const jwt = require('jsonwebtoken');

function fetchPaginationDetails() {
  return new Promise((resolve, reject) => {
    Post.count({}, (err, count) => {
      if (err) {
        reject(new Error(err));
      }

      resolve(count);
    });
  });
}

function buildQuery(params = {}) {
  const { max_time: maxTime, min_time: minTime, author } = params;
  const query = {};

  if (author) {
    console.log(`author: ${author}`);
    query.username = author;
  }

  if (maxTime && minTime) {
    return query;
  }

  if (maxTime) {
    query.created_at = {
      $lt: maxTime,
    };
  }

  if (minTime) {
    query.created_at = {
      $gt: minTime,
    };
  }

  return query;
}

function fetchPosts(query, count) {
  return new Promise((resolve, reject) => {
    Post
      .find(query)
      .sort({
        created_at: '-1',
      })
      .limit(parseInt(count, 10))
      .exec((err, posts) => {
        if (err) {
          reject(new Error(err));
        }

        resolve(posts);
      });
  });
}

function fetchPostById(id) {
  return new Promise((resolve, reject) => {
    if (id) {
      Post
        .findOne({
          _id: id,
        })
        .exec((err, post) => {
          if (err) {
            reject(new Error(err));
          }

          resolve(post);
        });
    } else {
      reject(new Error('ID not set'));
    }
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

function validatePostCreation(text, author) {
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

  return {
    fail: false,
  };
}

function savePost(text, author) {
  return new Promise((resolve, reject) => {
    Post
      .create({
        text,
        username: author,
        created_at: new Date(),
        comments_count: 0,
      }, (err, post) => {
        if (err) {
          reject(new Error(err));
        }

        resolve(post);
      });
  });
}

module.exports = {
  getPosts: (request, response) => {
    const query = buildQuery(request.query);
    let pagination;

    fetchPaginationDetails()
      .then((total) => {
        pagination = {
          count: request.query.count || 25,
          total,
        };
        return fetchPosts(query, pagination.count);
      })
      .then((posts) => {
        response.status(200).json({
          pagination,
          posts,
        });
      })
      .catch((err) => {
        response.status(500).json(err.message);
      });
  },
  getPostById: (request, response) => {
    const id = request.params && request.params.post_id;

    fetchPostById(id)
      .then((post) => {
        response.status(200).json({
          post,
        });
      })
      .catch((err) => {
        response.status(500).json(err.message);
      });
  },
  createPost: (request, response, next) => {
    const { text } = request.body;
    verifyToken(request.headers.authorization && request.headers.authorization.split(' ')[1])
      .then((author) => {
        const isValid = validatePostCreation(text, author);

        if (isValid.fail) {
          response.status(isValid.statusCode).json({
            msg: isValid.msg,
          });
          next();
        }
        return savePost(text, author);
      })
      .then((post) => {
        response.status(201).json(post);
      })
      .catch((err) => {
        response.status(500).json(err.message);
      });
    return null;
  },
};
