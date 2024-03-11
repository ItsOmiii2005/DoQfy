const mongoose = require('mongoose');

// Connect to MongoDB

const connectToMongoDB = async () => {
    mongoose
  .connect('mongodb://localhost/MCQwebApp?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

}

module.exports = connectToMongoDB;