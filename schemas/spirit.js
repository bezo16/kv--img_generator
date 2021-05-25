const mongoose = require('mongoose')

const spiritSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
  });

const Spirit = mongoose.model('spirit', spiritSchema);


module.exports = Spirit