// Browser Sync Dev Server Config
// ----------------------------------------
// This will setup a proxied version of the server on port 9000
// that injects JS code to reload the browser any time a change
// occurs. The settings below are designed around the Turnkey
// Liux node.js appliance.
//
// Settings:
// - Reads port settings from the config.js file
// - Disables the browser open command and the ui
// - Monitors all files in the 'public', 'views', and 'app' folders

let config = require('./config');

module.exports = {
  proxy: `${config.host}:${config.port}`,
  port: config.browserSyncPort,
  ui: false, open: false,
  files: [ 'public/*', 'views/*', 'app/*' ]
};
