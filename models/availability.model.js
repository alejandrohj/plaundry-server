const {Schema,model} = require('mongoose');

const AvailabilitySchema = new Schema({
      Code: String,
      available: {
        type: Boolean,
        default: false
      }
})

let Availability =  model('availability',AvailabilitySchema);

module.exports = Availability;