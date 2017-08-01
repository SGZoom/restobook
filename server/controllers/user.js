const config = require('../../config');
const User = require('../models/User').User;
const jwt = require('jsonwebtoken');

function validateSignUp(user) {
  if (!user) {
    return {
      fail: true,
      msg: 'No user set',
      statusCode: 400,
    };
  }

  if (user.password && user.password_confirmation && user.password !== user.password_confirmation) {
    return {
      fail: true,
      msg: 'Passwords don\'t match',
      statusCode: 400,
    };
  }

  return {
    fail: false,
  };
}

function validateLogin(user) {
  if (!user.username) {
    return {
      fail: true,
      msg: 'Please enter username.',
      statusCode: 400,
    };
  }

  if (!user.password) {
    return {
      fail: true,
      msg: 'Please enter your password.',
      statusCode: 400,
    };
  }

  return {
    fail: false,
  };
}

function checkIfUserExists(username) {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        reject(new Error('Something went wrong.'));
      }

      if (!user) {
        resolve();
      } else {
        reject(new Error('User already exists. Try logging in :)'));
      }
    });
  });
}

function createUser(query) {
  return new Promise((resolve, reject) => {
    User.create(
      {
        username: query.username,
        password: query.password,
      },
      (err, user) => {
        if (err) {
          reject(new Error('Something went wrong'));
        } else {
          resolve(user);
        }
      },
    );
  });
}

function findUser(username, password) {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        reject(new Error('Something went wrong'));
      }
      if (user === null) {
        reject(new Error('User does not exist. Try signing up :)'));
      }
      if (user && user.password !== password) {
        reject(new Error('Username and password are incorrect'));
      }

      resolve(user);
    });
  });
}

module.exports = {
  signUpUser: (request, response) => {
    const body = request.body;
    const isValid = validateSignUp(body);

    if (isValid.fail) {
      response.status(isValid.statusCode).json({
        msg: isValid.msg,
      });

      return null;
    }

    checkIfUserExists(body.username)
      .then(() => (
        createUser({
          username: body.username,
          password: body.password,
        })
      ))
      .then((user) => {
        const token = jwt.sign({ username: user.username }, config.jwtSecret);
        response.status(201).json({ token });
      })
      .catch((err) => {
        response.status(500).json(err);
      });
    return null;
  },
  loginUser: (request, response) => {
    const body = request.body;
    const isValid = validateLogin(request.body);

    if (isValid.fail) {
      response.status(isValid.statusCode).json({
        msg: isValid.msg,
      });

      return null;
    }

    findUser({ username: body.username, password: body.password })
      .then((user) => {
        const token = jwt.sign({ username: user.username }, config.jwtSecret);
        response.status(201).json({ token });
      })
      .catch((err) => {
        response.status(500).json(err);
      });
    return null;
  },
};
