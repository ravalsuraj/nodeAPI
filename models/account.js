var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');

var AccountSchema = new mongoose.Schema({

  email: {
    type: String, required: true, unique: true
  },

  password: {
    type:String ,required:true, minlength: 6,
    /*set: function(newPassword){
      return Hash.isHashed(newPassword)? newPassword : Hash.generate(newPassword);
    }*/
  },
  phone: {
    type: String, required: true,
    validate: {
      validator: function(phonenumber) {
        return /^[0-9]{10}$/.test(phonenumber);
      },
      message: '{VALUE} is not a valid phone number!'
    }
  },

  email_2: {
    type: "String",
    validate: {
      validator: function(email) {
          return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
      },
      message: '{VALUE} is not a valid Email Address!'
    }
  },
  phone_2: {
    type: "String",
    validate: {
      validator: function(phonenumber) {
          return /^[0-9]{10}$/.test(phonenumber);
      },
      message: '{VALUE} is not a valid phone number!'
    }
  },

  address_line1: {
    type: "String",
    required: true
  },

  address_line2: {
    type: "String",
  },

  city: {
    type: "String",
    required: true,
    default:"Mumbai"
  },
  state: {
    type: "String",
  },

  country: {
    type: "String", default: "India"
  },
  zip: {
    type: "String", required: true,
    validate: {
        validator: function(zip) {
            return /^[0-9]{6}$/.test(zip);
        },
        message: '{VALUE} is not a valid zip code!'
    }
  },

  Notes: {
    type: "String"
  },
});

// Hash the password before saving data
AccountSchema.pre('save', function(callback) {
  var account = this;

  if(!account.isModified('password'))
    return (callback);

  bcrypt.genSalt(5, function(err, salt){
    if(err) return callback(err);
    bcrypt.hash(account.password, salt, null, function(err, hash){
      if(err) return callback(err);
      account.password = hash;
      callback();
    });
  })
});

AccountSchema.methods.verifyPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, isMatch){
    if(err) return callback(err);
    callback(null, isMatch);
  });
};
AccountSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Accounts',AccountSchema);
