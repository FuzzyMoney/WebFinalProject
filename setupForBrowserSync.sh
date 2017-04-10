#!/bin/bash
if [[ $(/usr/bin/id -u) -ne 0 ]]; then
    echo "This script must be run as root or with sudo/su"
    exit
fi

if [ ! -e "package.json" ]; then
    echo "This script must be run in your react sandbox directory"
    exit
fi

configFile="./config.js"
if [ ! -e $configFile ]; then
    echo "Your directory is missing some files, make sure this is the correct folder."
    exit
fi

# Figure out the normal user name
normUser=`ls -ld ./ | awk '{print $3}'`

# Write out dev configuration for NGINX
printf "1) Installing development port/site for NGINX *******\n\n"
DEVSite="/etc/nginx/sites-available/dev"
DEVEnable="/etc/nginx/sites-enabled/dev"
DEVProxy="/etc/nginx/include/dev-proxy"

if [ ! -e $DEVSite ]; then
  cat > $DEVSite << 'ENDOFFILE'
server {
  listen 0.0.0.0:3000 default_server;
  server_name _;

  set $devapp_port 9000;
  include /etc/nginx/include/dev-proxy;
}

server {
  listen 0.0.0.0:3443 ssl default_server;
  server_name _;

  proxy_set_header X-Forwarded-Proto https;
  include /etc/nginx/include/ssl;

  set $devapp_port 9000;
  include /etc/nginx/include/dev-proxy;
}
ENDOFFILE
  ln -s "$DEVSite" "$DEVEnable"
fi

if [ ! -e $DEVProxy ]; then
  cat > $DEVProxy << 'ENDOFFILE'
location / {
  proxy_pass http://127.0.0.1:${devapp_port};

  # this is needed for websocket compatibility
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
ENDOFFILE
fi

printf "2) Restarting NGINX server ****************\n\n"
/etc/init.d/nginx restart

printf "3) Update Project Config for Browser Sync *******\n\n"
# Stop being the super user
su $normUser

BSyncConfig='./browser-sync.js'
if [ ! -e $BSyncConfig ]; then
  cat > $BSyncConfig << 'ENDOFFILE'
let config = require('./config');

module.exports = {
  proxy: `${config.host}:${config.port}`,
  port: config.browserSyncPort,
  ui: false, open: false,
  files: [ 'public/*', 'views/*', 'app/*' ]
};
ENDOFFILE
fi

# Add browser sync port to the config file
match="'0.0.0.0',"
insert="  browserSyncPort: 9000,"

sed -i "s/$match/$match\n$insert/" $configFile

printf "4) Installing Browser Sync as Dev Config *******\n\n"
npm install -D browser-sync json-loader babel-core

printf "5) Updating npm script commands *********\n\n"
lead='  "scripts": {'
tail='  "test":'
tempFile='tempConfig.js'
cat > $tempFile << 'ENDFILE'
    "dev": "npm run dev-nodemon & npm run dev-webpack & npm run dev-browsersync",
    "dev-nodemon": "nodemon --exec babel-node server.js --ignore public/",
    "dev-webpack": "webpack -wd",
    "dev-browsersync": "browser-sync start --config browser-sync.js",
ENDFILE
sed -e "/$lead/,/$tail/{ /$lead/{p; r $tempFile
        }; /$tail/p; d }" package.json > newPackage.json
mv newPackage.json package.json
rm $tempFile
