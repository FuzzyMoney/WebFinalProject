var cradle = require('cradle');
var CONFIG = require('../config.js');

var db = new(cradle.Connection)(
  `http://${CONFIG.couchDBHost}`,
  CONFIG.couchDBPort, {
    auth: {username: 'admin', password: 'Lolcats4' }
  }).database('my-flix');

module.exports = db;
