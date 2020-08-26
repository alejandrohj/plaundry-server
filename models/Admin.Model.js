const {Schema, model} = require('mongoose');

const adminSchema = new Schema(
  {
     email: {
      type: String,
      required: [true, 'Please enter email']
    },
     passwordHash: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = model('Admin', adminSchema);