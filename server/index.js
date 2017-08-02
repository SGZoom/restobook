const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');
const config = require('../config');
const userController = require('./controllers/user');
const postController = require('./controllers/posts');
const commentController = require('./controllers/comments');
const replyController = require('./controllers/replies');

const app = express();

app.use(bodyParser.json());
mongoose.connect(config.db);

app.get('/api/posts', postController.getPosts);

app.get('/api/posts/:post_id', postController.getPostById);

app.post('/api/posts', postController.createPost);

app.get('/api/posts/:post_id/comments', commentController.getComments);

app.post('/api/posts/:post_id/comments', commentController.createComment);

app.get('/api/comments/:comment_id/replies', replyController.getReplies);

app.post('/api/comments/:comment_id/replies', replyController.createReply);

app.post('/api/signup', userController.signUpUser);

app.post('/api/login', userController.loginUser);

app.use('/', express.static(config.clientPath));
app.get('/user/*', (request, response) => {
  response.header('Content-type', 'text/html');
  response.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('/post/*', (request, response) => {
  response.header('Content-type', 'text/html');
  response.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});
app.get('*', (request, response) => {
  response.header('Content-type', 'text/html');
  response.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`); // eslint-disable-line no-console
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`Someone has connected: ${socket.id}`);

  socket.on('newPost', () => {
    console.log('new post received');
    socket.broadcast.emit('fetchNewPost', true);
  });

  socket.on('disconnect', () => {
    console.log('Someone has disconnected! :( ');
  });
});
