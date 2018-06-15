var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "First name is required"
  },

  lastName: {
    type: String,
    required: "Last name is required"
  },

  dateOfBirth: {
    type: Date
  },

  email: {
    type: String,
    required: true,
    validate: {
      validator: function(email) {
          return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
      },
      message: '{VALUE} is not a valid Email Address!'
    }

  },

  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(phonenumber) {
          return /^[0-9]{10}$/.test(phonenumber);
      },
      message: '{VALUE} is not a valid phone number!'
    }
}
});
module.exports = mongoose.model('Customers',CustomerSchema);
