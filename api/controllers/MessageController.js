/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  pushMessage: function (req, res) {
    var messageInfo = {
      user: req.user,
      text: req.body.text,
      search: { id: req.body.channelId }
    };

    Message.pushMessage(messageInfo, function (error, message) {
      if (error) {
        return res.send({
          error: error
        });
      }

      return res.send({
        message: message
      });
    });
  }
};

