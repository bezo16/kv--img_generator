const mongoose = require('mongoose')

const skullSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
  });

const Skull = mongoose.model('skull', skullSchema);


module.exports = Skull

















