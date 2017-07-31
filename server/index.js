const express = require('express');

const app = express();

app.get('/api/posts', (request, response) => {
  /*
    API to return latest posts

    1.
      request: /api/posts?max_time=:now&count=:n
      response: {
        pagination: {
          count: at max n (number of records returned)
          total: total posts after this timestamp
        }
        posts: [
          {
            id,
            text,
            created_at,
            author: username,
            comments_count
          }
        ]
      }

    2.
      request: /api/posts?max_time=:timestamp_of_oldest_fetched_post&count=:n
      response: {
        pagination: {
          count: at max n (number of records returned)
          total: total posts after this timestamp
        }
        posts: [
          {
            id,
            text,
            created_at,
            author: username,
            comments_count
          }
        ]
      }

    3.
      request: /api/posts?author=:username&max_time=:timestamp&count=:n
      response: {
        pagination: {
          count: at max n (number of records returned)
          total: total posts after this timestamp
        }
        posts: [
          {
            id,
            text,
            created_at,
            author: username,
            comments_count
          }
        ]
      }
  */
});

app.get('/api/post/:post_id', (request, response) => {
  /*
    API to fetch a single post (and the first page of comments for the post)

    request: /api/posts/:post_id
    response: {
      post: {
        id,
        text,
        created_at,
        author: username,
        comments_count,
      }
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

app.post('/api/posts', (request, response) => {
  /*
    API to create a post

    request: /api/posts
    data: {
      text: post message
    }
    headers: {
      authorization: jwt token for user information (take author from here)
    }
    response: {
      id,
      text,
      created_at,
      author: username
    }
  */
});

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

app.post('/api/signup', (request, response) => {
  /*
    API to create a user

    request: /api/users/
    data: {
      username: this should be unique,
      password,
      password_confirmation
    },
    response: {
      token: the JWT
    }
  */
});

app.post('/api/login', (request, response) => {
  /*
    API to login in a user

    request: /api/login
    data: {
      username,
      password
    },
    response: {
      token
    }
  */
});

app.listen(1337, () => {
  console.log('Server running on port 1337'); // eslint-disable-line no-console
});
