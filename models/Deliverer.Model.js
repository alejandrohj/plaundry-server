const {Schema, model} = require('mongoose');

const DelivererSchema = new Schema(
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
    orderId: [{
      type: Schema.Types.ObjectId,
      ref: 'order'
    }],
    type: {
      type: String,
      default: 'deliverer'
    }
  },
  {
    timestamps: true
  }
);

DelivererSchema.index({ 'username': 1}, {unique: true});
DelivererSchema.index({ 'email': 1}, {unique: true});
module.exports = model('Deliverer', DelivererSchema);