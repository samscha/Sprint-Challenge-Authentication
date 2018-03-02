const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  User(req.user)
    .save()
    .then(savedUser => res.json(savedUser))
    .catch(err =>
      res.status(500).json({ message: 'Error saving user to database', err }),
    );
  // there should be a user object set on req
  // use that req.user object to create a user and save it to our Mongo instance.
};

module.exports = {
  createUser,
};
