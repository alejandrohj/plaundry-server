require('../configs/database.config');
const mongoose = require('mongoose');

const AdminModel = require('../models/Admin.model');

AdminModel.create(
  {
  email: 'admin@planundry.com',
  passwordHash: '123456Aa!' 
  }
)
  .then(() =>{
    mongoose.connection.close()
      .then(()=>{
        console.log('Data seeded')
      })
  })