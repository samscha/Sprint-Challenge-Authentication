const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const { mongodbAuth } = require('./config.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth-users', {
  useMongoClient: true,
  user: mongodbAuth.user,
  pass: mongodbAuth.pass,
  authSource: mongodbAuth.authSource,
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
