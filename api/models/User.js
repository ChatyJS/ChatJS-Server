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

  withUser: function (options, cb) {
    User.findOne(options).exec(function (error, user) {
      if (error) return cb(error);
      if (!user) return cb(new Error('User not found.'));
      return cb(null, user);
    });
  },

  addFriend: function (options, cb) {
    User.withUser({ id: options.user.id }, function (error, user) {
      User.withUser({ name: options.friendName }, function (error, friend) {
        Contact.create({
          user: user,
          friend: friend
        }).exec(function (error, newFriend) {
          if (error) return cb(error);
          return cb(null, newFriend);
        });
      });
    });
  },

  getFriends: function (options, cb) {
    User.withUser(options, function (error, user) {
      return cb(null, user.contacts);
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
