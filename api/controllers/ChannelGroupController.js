/**
 * ChannelController
 *
 * @description :: Server-side logic for managing channels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
<<<<<<< HEAD
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
  },

  getSingleChannel: function (req, res) {
    var options = {
      id: req.params.channelId
    };
    ChannelGroup.getSingleChannel(options, function (error, channel) {
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

  getGroups: function (req, res) {

    //groups.push({'name': 'Fiesta', 'members': ['yo', 'tu']});



    ChannelGroup.getChannels(req.user, function (error, channels) {
      if (error) {
        return res.send({
          error: error
        });
      }
      let groups = [];
      channels.map((channel)=>{
        ChannelGroup.withChannel({ id: channel.id }, function (error, group) {
          if (error) return cb(error);
            groups.push({'name': channel.name, 'members': group.users});
            //groups.push({'name': 'Misa', 'members': [{'name': 'Jhon'}, {name:'Carito'}]});
        });
      });
      groups.push({'name': 'Fiesta', 'members': [{'name': 'yo'}, {name:'tu'}], 'other': channels});
      return res.send({groups: groups});
    });
  }
};
