const {Schema, model} = require('mongoose');

const userSchema = new Schema(
  {
     username: {
       type: String,
       required: [true, 'Please enter username']
     }, 
     email: {
      type: String,
      required: [true, 'Please enter email']
    },
     passwordHash: {
      type: String,
      required: true
    },
    firstName: String,
    lastName: String,
    address:{
      address: String,
      postalCode: String,
      city: String,
      coordinates:{
        lat: Number,
        lng: Number
      }
    },
    orderHistory: [{
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }],
  },
  {
    timestamps: true
  }
);

userSchema.index({ 'email': 1}, {unique: true});
userSchema.index({ 'username': 1}, {unique: true});

module.exports = model('User', userSchema);