// Bring in express as our server
import express from 'express';

// Bring in configuration from the config.js file
import config from './config';

// Create a new express server
const server = express();

// Use EJS as our view engine (defaults to 'views' folder)
server.set('view engine', 'ejs');

// Log all requests
server.use((req, res, next) => {
  console.info(`${req.method} at ${req.url}`);
  next();
});

// Serve the react app from the ejs index file when root is accessed
server.get('/', (req, res) => {
  res.render('index');
});

// Serve all other files in the public folder statically
server.use(express.static('public'));

// Listen for connections using the port and host specified in the config
server.listen(config.port, config.host, () => {
  console.info(`Express listening on port ${config.port}`);
});

// Export the server in case we want to integrate this in a larger system
export default server;
