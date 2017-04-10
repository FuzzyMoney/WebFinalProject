# reactExpress
Template for a react + express web application.

Setting up a new project that utilizes React.js is an involved process. This is a quick
template that is designed to take care of that so you can get right to building your web
app.

## Features
- Express.js integrated for main server to handle backend and static file server for client
- Preconfigured Babel and WebPack to translate JSX and package for client side
- Babel configured to support ES2015 and stage 2 ES proposals
- Pre-defined NPM scripts to run nodemon and webpack for syncronized updates
- Configured with browser-sync to automatically referesh browser on changes
- Designed to work with Turnkey Linux Node server's slightly unusual ports
- Includes configuration for eslint and the atom remote-sync package

## Usage
Fork this repo, do an npm install, and build away!

It's a good idea to edit the package.json with your project details. You will also need
to edit the remote-sync config file for your specific server if you intend to use that.
Make sure to install eslit and eslint-plugin-react locally for the best atom experience.
