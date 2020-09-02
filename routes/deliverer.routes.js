const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const DelivererModel = require('../models/Deliverer.Model');


router.post('/deliverer/create', (req, res) => {
  const {username,email, password} = req.body;
  console.log(req.body)
  if (!username) {
    res.status(500)
      .json({
        error: 'Please enter a username'
      });
    return;  
  }

  if (!email) {
    res.status(500)
      .json({
        error: 'Please enter an email'
      });
    return;  
  }

  if (!password) {
    res.status(500)
      .json({
        error: 'Please enter a password'
      });
      return;  
  }
  const emailRegEx = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
  if (!emailRegEx.test(email)) {
    res.status(500)
      .json({
        error: 'Please enter a valid email'
      })
    return;
  }

  const passwordRegEx = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
  if (!passwordRegEx.test(password)) {
    res.status(500)
      .json({
        error: 'Password must contain letter, uppercase letter, number and a special character, and needs to have 8 characters.'
      })
    return;
  }

  bcrypt.genSalt(10)
    .then((salt) => {
      bcrypt.hash(password, salt)
          .then((passwordHash) => {
            DelivererModel.create({username,email, passwordHash})
              .then((deliverer) => {
                res.status(200).json(deliverer);
              })
              .catch((err) => {
                if (err.code === 11000) {
                  res.status(500)
                    .json({
                      error: 'Username or email already exists!'
                    });
                  return;  
                } 
                else {
                  res.status(500)
                    .json({
                      error: 'Something went wrong!'
                    });
                  return; 
                }
              })
          })  
    });

})

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

router.get('/deliverers', (req,res)=>{
  DelivererModel.find()
    .then((deliverers)=>{
      res.status(200).json(deliverers)
    })
    .catch((err)=>{
      res.status(500).json({
        error: 'No deliverers already to show',
        message: err
      })
    })
})

router.delete('/deliverer/:id/delete', (req, res) => {
  DelivererModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result)      
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    })
})
module.exports = router;