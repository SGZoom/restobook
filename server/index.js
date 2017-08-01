const express = require('express');
const config = require('../config');
const userController = require('./controllers/user');
const postController = require('./controllers/posts');
const commentController = require('./controllers/comments');

const app = express();

app.get('/api/posts', postController.getPosts);

app.get('/api/post/:post_id', postController.getPostById);

app.post('/api/posts', postController.createPost);

app.get('/api/posts/:post_id/comments', commentController.getComments);

app.post('/api/posts/:post_id/comments', commentController.createComment);

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
