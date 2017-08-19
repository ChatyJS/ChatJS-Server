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
    messages:{
      collection:'message',
      via:'channelgroup'
    },
    users:{
      collection:'user',
      via:'channelgroup',
      through: 'usergroup'
    }
  },

  addChannel: function (options, cb) {
    var channelName = options.user.name + "-" + options.friendName;
    var search = { name: channelName };
    User.withUser({ id: options.user.id }, function (error, user) {
      User.withUser({ name: options.friendName }, function (error, friend) {
        ChannelGroup
          .find(search, function (error, tmpChannel) {
            if (tmpChannel) {
              return cb(null, tmpChannel);
            } else {
              var inverseName = options.friendName + "-" + options.user.name;
              var newChannel = { name: inverseName };
              ChannelGroup
                .create(newChannel, function (error, channel) {
                  user.channels.add(channel.id);
                  friend.channels.add(channel.id);
                  user.save(function (error, user) {
                    if (error) return cb(error);
                    return cb(null, channel);
                  });
                });
            }
          });
      });
    });
  },

  getChannels: function (options, cb) {
    User.withUser({ id: options.id }, function (error, user) {
      if (error) return cb(error);
      return cb(null, user.channels);
    });
  }
};
