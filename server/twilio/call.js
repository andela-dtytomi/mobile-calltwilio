var client = require('./client');
var logger = require('../logger/log');

var call = {};

call.triggerCall = function( to, callback) {
  client.makeCall({

    to: to,
    from: '+12025177912',
    url: 'https://6d236f7f.ngrok.com/call/' + (Math.ceil((Math.random() * 10) % 2)) // the endpoint is made dynamic
    // Math.ceil((Math.random() * 10 % 2)) -> generates either 1 or 2
    // The endpoints are made dynamic so that we can handle each response uniquely
  }, function(error, response){
    
    // Log the response to DiskDB to auditing purposes
    if (error) {
      logger.logCall({
        "status": "error",
        "error": error
      });
    } else {
      logger.logCall({
        "status": "status",
        "response": response
      });
    }    
    callback(error, response);
  });
};
module.exports = call;