const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },

role: {
      type: String,
      enum: ['admin', 'auditor', 'employee'],
      default: 'employee',
    },
      department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (document, userObj) => {
    delete userObj.password;
    // we can add any field we want here that is not on the model
    // computed fields
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
