const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const passport = require('passport');

// Require our custom strategies
require('../services/passport');

const signinStrategy = passport.authenticate('signinStrategy', { session: false });

// Helper method to create a token for a user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user._id, iat: timestamp }, process.env.SECRET);
}

router.post('/signin', signinStrategy, function(req, res, next) {
  res.json({ token: tokenForUser(req.user)});
});

router.post('/signup', function(req, res, next) {
  // Grab the username and password from our request body
  const { username, password } = req.body;

  // If no username or password was supplied return an error
  if (!username || !password) {
    return res.status(422)
      .json({ error: 'You must provide an username and password' });
  }

  // Look for a user with the current user name
  User.findOne({ username }).exec()
    .then((existingUser) => {
      // If the user exist return an error on sign up
      if (existingUser) {
        return res.status(422).json({ error: 'Username is in use' });
      }

      bcrypt.genSalt(10, function(salt) {
        bcrypt.hash(password, salt, null, function(err, hashedPassword) {
          if (err) {
            return next(err);
          }

          // Create a new user with the supplied username, and the hashed password
          const user = new User({ username, password: hashedPassword });

          // Save and return the user
          user.save()
            .then(user => {
              console.log();
               return res.json({ token: tokenForUser(user) });
            });
          });
       });

    })
    .catch(err => next(err));
});

module.exports = router;
