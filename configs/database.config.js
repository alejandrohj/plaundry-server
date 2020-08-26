const mongoose = require('mongoose');

// We connect to our local database here called `todos`
let configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/plaundry'

mongoose.connect(MONGODB_URI, configOptions)
    .then(() => {
        console.log('Yayyy Database is connected');
    })
    .catch(() => {
        console.log('Something went wrong!');
    })