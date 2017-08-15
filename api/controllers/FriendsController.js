/**
 * FriendsController
 *
 * @description :: Server-side logic for managing friends
 */

module.exports = {
  getFriends: function (req, res) {
    console.log(req.user);
    var userId = req.user.id;
    return res.send({
      message: "Correct! " + userId
    });
  }
};

