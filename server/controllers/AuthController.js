// AuthController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred' });
    }

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password' });
      }

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      newUser.save((err, savedUser) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating user' });
        }

        const token = jwt.sign({ username }, 'secretKey');
        res.status(200).json({ token });
      });
    });
  });
};
