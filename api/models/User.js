/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    name:{
      type:'string',
      required:true
    },
    email:{
      type:'email',
      unique:true,
      required:true
    },
    status:{
      type:'boolean'
    },
    age:{
      type:'integer'
    },
    password:{
      type:'string',
      minLength: 6,
      required:true
    },
    contacts:{
      collection:'contact',
      via:'user'
    },
    logins:{
      collection:'login',
      via:'user'
    }
  },

  getFriends: function (options, cb) {
    User.findOne(options.id).exec(function (error, user) {
      return user.contacts;
    });
  },

  beforeCreate: function(user, callback) {
    bcrypt.genSalt(10, function(error, salt) {
      bcrypt.hash(user.password, salt, function(error, hash){
        if(error) {
          console.log("[ERROR]: ", error);
          callback(error);
        } else {
          user.password = hash;
          callback();
        }
      });
    });
  }
};
