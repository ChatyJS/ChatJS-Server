/**
 * FriendsController
 *
 * @description :: Server-side logic for managing friends
 */

module.exports = {
  addFriend: function (req, res) {
    var friendInfo = {
      user: req.user,
      friendName: req.body.friendName
    };

    User.addFriend(friendInfo, function (error, friend) {
      if (error) {
        return res.send({
          error: error
        });
      }

      return res.send({
        friend: friend
      });
    });
  },

  getFriends: function (req, res) {
    User.getFriends(req.user, function (error, friends) {
      if (error) {
        return res.send({
          error: error
        });
      }

      return res.send({
        friends: friends
      });
    });
  }
};

