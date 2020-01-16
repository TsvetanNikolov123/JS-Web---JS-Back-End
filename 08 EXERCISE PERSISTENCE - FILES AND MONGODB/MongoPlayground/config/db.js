const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/mongo_playground';

module.exports = mongoose.connect(connectionString);