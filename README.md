# Restobook

A simple real-time Social Network :koala:

[Live Demo](http://139.59.18.76/)

![post-socket](https://user-images.githubusercontent.com/6417910/28912207-f440c490-7850-11e7-83e7-8b0045a92f17.gif)

## Setup Guide

You can view the setup guide for the project [here](https://github.com/abinavseelan/restobook/wiki/Setup-Guide)

## References

- [Frontend Architecture](https://github.com/abinavseelan/restobook/wiki/Frontend-Architecture)
- [API Endpoints](https://github.com/abinavseelan/restobook/wiki/Endpoints)
- [Models](https://github.com/abinavseelan/restobook/wiki/Models)

## Features

### Authentication system

- Application has a Basic authentication system based on `username` and `password`

<img width="722" alt="login-1" src="https://user-images.githubusercontent.com/6417910/28912204-f439d57c-7850-11e7-931f-b549e8178f91.png">

- Handles input field validation

<img width="697" alt="login-2" src="https://user-images.githubusercontent.com/6417910/28912205-f43cc8f4-7850-11e7-9db9-34f77e0eb6ed.png">

- Checks if user does not exist.

<img width="712" alt="login-3" src="https://user-images.githubusercontent.com/6417910/28912212-f4bff26a-7850-11e7-91cb-ddf69506a0a6.png">

- Switching from `Login` view to `Register` view maintains the previously entered data

![login-to-register](https://user-images.githubusercontent.com/6417910/28912206-f43d66f6-7850-11e7-816f-9f1be49abfaf.gif)

- On the `Register` view, user's existence is checked. If user already exists, you are prompted to log in

<img width="872" alt="register-1" src="https://user-images.githubusercontent.com/6417910/28912210-f46691f2-7850-11e7-9bcc-31ad44ebc5f4.png">


### Feed

- Users can create posts

![post-post](https://user-images.githubusercontent.com/6417910/28912208-f4465f68-7850-11e7-8efa-9a393e744566.gif)

- Timeline for a user can be viewed

![profile](https://user-images.githubusercontent.com/6417910/28912211-f4bfa576-7850-11e7-9b47-e63c0878cfc1.gif)

- Timestamp for posts auto-updated every minute

![update-timestamp-dynamic](https://user-images.githubusercontent.com/6417910/28912209-f46640e4-7850-11e7-9448-884a9c1a3852.gif)

- Users get notified that when new posts are available. This is done via sockets. Clicking on the button will fetch the new posts and scroll the window to the top.

![post-socket](https://user-images.githubusercontent.com/6417910/28912207-f440c490-7850-11e7-83e7-8b0045a92f17.gif)

### Post

- Comments can be viewed and added for a specific post.
- Replies are nested within comments. Clicking on `View Replies` will fetch the replies for a particular comment. A user can participate in the reply thread as well.

![comments-replies](https://user-images.githubusercontent.com/6417910/28912218-fa37a922-7850-11e7-9ef6-f7ed47ea54b5.gif)
