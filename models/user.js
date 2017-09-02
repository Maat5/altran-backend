const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passwordHash = require('bcrypt-nodejs');
const moment = require('moment');

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['admin', 'users']},
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  toObject: {
    virtuals: true
  },
  versionKey: false
});

// generating a hash
userSchema.methods.generateHash = (password) => {
  return passwordHash.hashSync(password, passwordHash.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  try{
    return passwordHash.compareSync(password, this.password );
  }
  catch(e){
    return false;
  }
};

module.exports = mongoose.model('Users', userSchema);
