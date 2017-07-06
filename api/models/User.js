/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
  }
};
