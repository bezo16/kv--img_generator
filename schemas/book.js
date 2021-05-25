const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
  });

const Book = mongoose.model('book', bookSchema);


module.exports = Book