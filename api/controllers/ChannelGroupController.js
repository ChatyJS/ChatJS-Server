/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addChannel: function (req, res) {
    var options = {
      user: req.user,
      friendName: req.body.friendName
    };

    ChannelGroup.addChannel(options, function (error, channel) {
      if (error) {
        return res.send({
          error: error
        });
      }

      return res.send({
        channel: channel
      });
    });
  },

  getChannels: function (req, res) {
    ChannelGroup.getChannels(req.user, function (error, channels) {
      if (error) {
        return res.send({
          error: error
        });
      }

      return res.send({
        channels: channels
      });
    });
  }
};
