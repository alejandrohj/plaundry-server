const express = require('express');
const router = express.Router();

const AvailabilityModel = require('../models/availability.model');
const { isLoggedIn } = require('../helpers/auth-helper');

router.get('/availability', (req, res) => {
  AvailabilityModel.find()
    .then((result) => {
      console.log('laubde', result)
      res.status(200).json(result)
    })
})

router.post('/availability/create', isLoggedIn, (req,res)=>{
  const {Code} = req.body;
  if(!Code) {
    res.status(500)
    .json({
      error: 'Please enter a postalCode'
    });
  return;
  };

  AvailabilityModel.create({Code:Code})
    .then((response)=>{
      res.status(200).json({response, message: 'Item created'})
    })
    .catch((err)=>{
      if (err.code === 11000) {
        res.status(500)
          .json({
            error: 'Item-name already exists!'
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

router.post('/availability/:id/edit', isLoggedIn, (req,res)=>{
  let id = req.params.id;
  console.log(id)
  const {available} = req.body;
  console.log(available, 'its')
  AvailabilityModel.findByIdAndUpdate(id,{$set:{available:available}})
    .then((response)=>{
      res.status(200).json({response, message: 'Changes saved'})
    })
    .catch((err)=>{
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    })
})
module.exports = router;