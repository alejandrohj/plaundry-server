const {Schema, model} = require('mongoose');

const delivererSchema = new Schema(
  {
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
      ref: 'Order'
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

delivererSchema.index({ 'email': 1}, {unique: true});
module.exports = model('Deliverer', delivererSchema);