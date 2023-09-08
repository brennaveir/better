const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const bitSchema = new Schema({
  bitText: {
    type: String,
    required: 'You need to post a bit!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  bitAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Bit = model('Bit', bitSchema);

module.exports = Bit;
