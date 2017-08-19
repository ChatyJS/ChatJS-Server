/**
 * UserGroupController
 *
 * @description :: Server-side logic for managing Usergroups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getGroups: function (req, res) {
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
