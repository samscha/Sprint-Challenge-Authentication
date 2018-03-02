const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModels');
const { mysecret } = require('../../config');
const SaltRounds = 11;

const authenticate = (req, res, next) => {
  const token = req.get('Authorization');
  if (token) {
    jwt.verify(token, mysecret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
};

const encryptUserPW = (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, SaltRounds, (err, hash) => {
    if (err) {
      res.status(500).json({ message: 'Error occured while hashing pwd', err });
      return;
    }

    req.user = { username, password: hash };
    next();
  });
};

const compareUserPW = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        res
          .status(500)
          .json({ message: `Username (${username}) not found.`, err });
        return;
      }

      bcrypt.compare(password, foundUser.password, (err, isValid) => {
        if (err) {
          res.status(500).json({ message: 'Password did not match', err });
          return;
        }

        if (!isValid) {
          res.status(500).json({ message: 'Passwords did not match.' });
        }

        req.username = foundUser.username;
        next();
      });
    })
    .catch(err =>
      res.status(500).json({ message: 'Error finding user.', err }),
    );
};

module.exports = {
  authenticate,
  encryptUserPW,
  compareUserPW,
};
