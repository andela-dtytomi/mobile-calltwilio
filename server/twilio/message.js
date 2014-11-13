var client = require('./client');
var logger = require('../logger/log');
var msg = {};

msg.sendMsg = function( to, message, callback) {
  client.sendMessage({
    to: to,
    from: '+12025177912',
    body: message
  }, function(error, message){
    if (error) {
      logger.logMsg({
        "status": "error",
        "error": error
      });
    } else {
      logger.logMsg({
        "status": "success",
        "message": message
      });
    }
    callback(error, message);
  });
};

module.exports = msg;