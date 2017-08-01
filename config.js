const path = require('path');

module.exports = {
  jwtSecret: 'swiggy',
  port: 1337,
  db: 'mongodb://localhost:27017/restobook',
  clientPath: path.join(__dirname, '/client/build'),
};
