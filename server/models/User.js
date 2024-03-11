// models/faculty.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    
  },
  tokens:
  { type: Number,
  default:0 },
  // Other faculty attributes
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
