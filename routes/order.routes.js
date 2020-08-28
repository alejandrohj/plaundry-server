const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const OrderModel = require('../models/order.model');
const {isLoggedIn} = require('../helpers/auth-helper');

router.get('/orders', isLoggedIn, (req, res) => {
  OrderModel.find()
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json({
        error: 'Somehting went wrong',
        message: err
      })
    });
})

router.post('/order', (req, res) => {
  const {userId, order, pickUp, delivery} = req.body;
  OrderModel.create({userId, order, pickUp, delivery, status: 'to pick up'})
    .then((result) => {
      res.status(200).json(result)
      console.log(result)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

router.get('/order/:id', isLoggedIn, (req,res) => {
  OrderModel.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    });
})

router.post('/order/:id/edit', isLoggedIn, (req, res) => {
  const {status} = req.body
  OrderModel.findByIdAndUpdate(req.params.id, {$set: {status: status}})
    .then((result) => {
      res.status(200).json(result)
      console.log('changed order')
    }).catch((err) => {
      res.status(500).json({
        error: 'Somehting went wrong order',
        message: err
      })
    });
})

// router.get('/orders/availability', (req, res) => {
  
// })

module.exports = router;