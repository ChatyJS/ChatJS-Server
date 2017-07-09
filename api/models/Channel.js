/**
 * Channel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:'string'
    },
    description:{
      type:'string'
    },
    date:{
      type:'datetime'
    },
    messages:{
      collection:'message',
      via:'channel'
    },
    logins:{
      collection:'login',
      via:'channel'
    }
  }
};