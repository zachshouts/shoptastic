const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    require: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  purchases: [{ type: Schema.Types.ObjectId, ref: 'Product'}]
});


const User = model('User', userSchema);
module.exports = User;
