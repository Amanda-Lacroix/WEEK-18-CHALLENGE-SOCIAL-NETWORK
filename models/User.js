// Importing the Mongoose library
const mongoose = require('mongoose');

const { Schema } = mongoose;
// Defining the schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);
// Defines virtual property friendCount, defines getter function calculating length of friends array
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);
// Exporting to make available for other parts of the application
module.exports = User;
