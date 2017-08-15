/**
 * FriendsController
 *
 * @description :: Server-side logic for managing friends
 */

module.exports = {
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

