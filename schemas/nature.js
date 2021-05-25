const mongoose = require('mongoose')

const natureSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
  });

const Nature = mongoose.model('nature', natureSchema);


module.exports = Nature