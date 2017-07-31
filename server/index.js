const express = require('express');

const app = express();

app.get('/api/posts', (request, response) => {
  /*
    API to return posts

    1.
      request: /api/posts
      response: {
        pagination: {
          per_page: posts per page,
          page: 1,
          total: total number of posts,
          pages: total number of pages,
        },
        posts: [
          {
            text,
            created_at,
            author
          }
        ]
      }

    2.
      request: /api/posts?page=:n
      response: {
        pagination: {
          per_page: posts per page,
          page: n,
          total: total number of posts,
          pages: total number of pages,
        },
        posts: [
          {
            text,
            created_at,
            author
          }
        ]
      }

    3.
      request: /api/posts?user=:user_id
      response: {
        pagination: {
          per_page: posts per page,
          page: 1,
          total: total number of posts,
          pages: total number of pages,
        },
        posts: [
          {
            text,
            created_at,
            author
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
      authorization: jwt token for user information
    }
    response: {
      text,
      created_at,
      author
    }
  */
});

app.get('/api/comments', (request, response) => {
  /*
    API to return comments for a given post

    1.
      request: /api/comments?post=:post_id
      response: {
        pagination: {
          per_page: comments per page,
          page: 1,
          total: total number of comments,
          pages: total number of pages,
        },
        post_id: id of post,
        parent_comment: null,
        comments: [
          {
            author,
            created_at,
            text
          }
        ]
      }
  */
});

app.post('/api/posts/:post_id/comments', (request, response) => {
  /*
    API to create a comment

    1.
      request: /api/posts/:post_id/comments
      data: {
        text: comment text
      },
      header: {
        authorization: to get user information
      }
      response: {
        author,
        created_at,
        text,
        post_id
      }
  */
});

app.get('/api/comments/:comment_id/replies', (request, response) => {
  /*
    API to return replies for a comment

    request: /api/comments/:comment_id/replies
      response: {
        pagination: {
          per_page: replies per page,
          page: 1,
          total: total number of replies,
          pages: total number of pages,
        },
        parent_comment: id of parent comment,
        replies: [
          {
            author,
            created_at,
            text
          }
        ]
      }
  */
});

app.post('/api/comments/:comment_id/replies', (request, response) => {
  /*
    API to create a reply to a comment

    request: /api/comments/:comment_id/replies
    data: {
      text: reply text
    },
    header: {
      authorization: to get user information
    }
    response: {
      author,
      created_at,
      text,
      post_id
    }
  */
});

app.get('/api/users', (request, response) => {
  /*
    API to fetch users

    request: /api/users?query=:query_string
    response: {
      users: [
        {
          username,
          id
        }
      ]
    }
  */
});

app.post('/api/users', (request, response) => {
  /*
    API to create a user

    request: /api/users/
    data: {
      name,
      email: this should be unique,
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
      email,
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
