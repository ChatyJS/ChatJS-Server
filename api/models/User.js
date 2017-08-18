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
      collection:'user',
      via:'friends',
      dominant: true
    },
    logins:{
      collection:'login',
      via:'user'
    },
    friends: {
      collection: 'user',
      via: 'contacts'
    }
  },

  withUser: function (options, cb) {
    User
      .findOne(options)
      .populate('friends')
      .populate('contacts')
      .exec(function (error, user) {
        if (error) return cb(error);
        if (!user) return cb(new Error('User not found.'));
        return cb(null, user);
    });
  },

  addFriend: function (options, cb) {
    User.withUser({ id: options.user.id }, function (error, user) {
      User.withUser({ name: options.friendName }, function (error, friend) {
        if (error) return cb(error);
        user.friends.add(friend.id);
        user.contacts.add(friend.id);
        user.save(function (error, user) {
          if (error) return cb(error);
          return cb(null, user);
        });
      });
    });
  },

  getFriends: function (options, cb) {
    User.withUser({ id: options.id }, function (error, user) {
      if (error) return cb(error);
      return cb(null, user.friends);
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
