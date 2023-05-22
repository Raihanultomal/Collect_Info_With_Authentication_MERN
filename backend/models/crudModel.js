const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { default: mongoose } = require('mongoose');
const { isEmail } = require('validator');

const crudSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegisterSchema',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email address.'],
  },
  number: {
    type: Number,
    required: [true, 'Please provide your name.'],
  },
});

const Crud = mongoose.model('Crud', crudSchema);
module.exports = Crud;
