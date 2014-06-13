module['exports'] = function listen (options, callback) {

  var mesh = require('../').mesh,
      http = require('resource-http'),
      engine = require('engine.io');

  if (typeof http.app === 'object') {
    attach(http.app);
  }
  else {
    http.listen(options, function (err, app) {
      if (err) {
        return callback(err);
      }
      attach(app);
    });
  }

  function attach(app) {
    //
    // Remark: mesh.server is the same as http.server
    //
    mesh.server = engine.attach(app.server);
    mesh.server.on('connection', function(socket){
      mesh.downlink(socket, function(err, result){
        if (err) {
          throw err;
        }
      });
    });
    callback(null, mesh.server);
  }

};