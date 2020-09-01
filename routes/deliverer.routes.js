const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const DelivererModel = require('../models/deliverer.model');

router.post('/deliverer/signin', (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(500)
      .json({
        errorMessage: 'Please enter email and password'
      });
    return;
  }

  const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
      res.status(500)
        .json({
          error: 'Email format not correct',
        })
      return;  
    }

    DelivererModel.findOne({email})
      .then((user) => {
        bcrypt.compare(password, user.passwordHash)
          .then((matches) => {
            if (matches) {
              user.passwordHash = "***";
              req.session.loggedInUser = user;
              console.log('Signin succes!', req.session)
              res.status(200).json(user);
            }
            else {
              res.status(500)
                .json({
                  error: 'Password don\'t match, please try again'
                })
              return;
            }
          }).catch(() => {
            res.status(500)
              .json({
                error: 'Password don\'t match, please try again'
              })
            return;
          });
      }).catch(() => {
        res.status(500).json({
          error: 'Email not correct'
        })
        return;
      });
})

module.exports = router;