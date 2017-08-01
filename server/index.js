const express = require('express');
const config = require('../config');
const userController = require('./controllers/user');
const postController = require('./controllers/posts');

const app = express();

app.get('/api/posts', postController.getPosts);

app.get('/api/post/:post_id', postController.getPostById);

app.post('/api/posts', postController.createPost);

app.get('/api/posts/:post_id/comments', (request, response) => {
  /*
    API to return comments for a given post

    1.
      request: /api/posts/:post_id/comments
      response: {
        pagination: {
          count: n,
          total: remaining comments to load
        },
        post_id: id of post,
        comments: [
          {
            id,
            author: username,
            created_at,
            text,
            replies_count
          }
        ]
      }
  */
});

app.post('/api/posts/:post_id/comments', (request, response) => {
  /*
    API to create a comment (and update post's comment count)

    1.
      request: /api/posts/:post_id/comments
      params: {
        post_id: ID of post for which the comment is being made
      }
      data: {
        text: comment text
      },
      header: {
        authorization: to get user information (to get author details)
      }
      response: {
        post_id: ID of post for which the comment is being added,
        comment: {
          id,
          author: username,
          created_at,
          text
        }
      }
  */
});

app.get('/api/comments/:comment_id/replies', (request, response) => {
  /*
    API to return replies for a comment

    request: /api/comments/:comment_id/replies
      response: {
        pagination: {
          count: n
          total: The number of replies left to be loaded
        },
        comment_id: id of parent comment,
        replies: [
          {
            id,
            author: username,
            created_at,
            text
          }
        ]
      }
  */
});

app.post('/api/comments/:comment_id/replies', (request, response) => {
  /*
    API to create a reply to a comment (and update comment with reply count)

    request: /api/comments/:comment_id/replies
    params: {
      comment_id: ID for which the reply is being made
    }
    data: {
      text: reply text
    },
    header: {
      authorization: to get user information
    }
    response: {
      comment_id,
      reply: {
        author: username,
        created_at,
        text,
      }
    }
  */
});

app.post('/api/signup', userController.signUpUser);

app.post('/api/login', userController.loginUser);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`); // eslint-disable-line no-console
});
