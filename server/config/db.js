// Import mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// disabling strict mode for queries to allow flexibility
mongoose.set('strictQuery', false);
// asynchronous function to connect to MongoDB instances
const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}
//export connection DB
module.exports = connectDB;
