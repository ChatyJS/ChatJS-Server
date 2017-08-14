/**
 * FriendsController
 *
 * @description :: Server-side logic for managing friends
 */

module.exports = {
  getFriends: function (req, res) {
    var userId = req.param('userId');
    return res.send({
      message: "Correct! " + userId
    });
  }
};

