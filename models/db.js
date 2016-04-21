const config = require('config')
  ,mysql = require('mysql');

export function getConnection() {

  if ((module.exports.connection) && (module.exports.connection._socket)
    && (module.exports.connection._socket.readable)
    && (module.exports.connection._socket.writable)) {
    return module.exports.connection;
  }

  var connection = mysql.createConnection({
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database,
    port     : config.mysql.port
  });

  connection.connect(function(err) {
    if (err) {
      console.log("SQL CONNECTION ERROR: " + err);
    } else {
      console.log("SQL CONNECTION SUCCESSFUL.");
    }
  });
  connection.on("close", function (err) {
    console.log("SQL CONNECTION CLOSED.");
  });
  connection.on("error", function (err) {
    console.log("SQL CONNECTION ERROR: " + err);
    process.exit(1);
  });
  module.exports.connection = connection;
  return module.exports.connection;
}


