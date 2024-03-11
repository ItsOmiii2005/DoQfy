// model.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
},
{
  versionKey: false, // Disable the "__v" field
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
