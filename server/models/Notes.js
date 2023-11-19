const mongoose = require('mongoose');

// Create a Mongoose schema
const Schema = mongoose.Schema;
// Define the structure of the Note schema
const NoteSchema = new Schema({
  user: {
    type: Schema.ObjectId, 
    ref: 'User'  // Reference to the User model
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});
// Create and export the Note model based on the defined schema
module.exports = mongoose.model('Note', NoteSchema);

