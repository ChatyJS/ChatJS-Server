/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    text:{
      type:'longtext'
    },
    channelgroup:{
      model:'channelgroup'
    },
    author: {
      model: 'user'
    }
  },

  pushMessage: function (options, cb) {
    ChannelGroup.getSingleChannel(options.search, function (error, channel) {
      var newMessage = {
        author : options.user,
        text: options.text
      };
      Message.create(newMessage).exec(function (error, message) {
        if (error) return cb(error);
        channel.messages.add(message.id);
        channel.save(function (error, channel) {
          if (error) return cb(error);
          return cb(null, message);
        });
      });
    });
  }
};
