// Bring in express as our server
import express from 'express';
import socket_io from 'socket.io';
import http from 'http';

// Bring in configuration from the config.js file
import config from './config';

// Create a new express serverx

const app = express();
let server = http.Server(app);
let io = socket_io(server);

// Use EJS as our view engine (defaults to 'views' folder)
app.set('view engine', 'ejs');

// Log all requests
app.use((req, res, next) => {
  console.info(`${req.method} at ${req.url}`);
  next();
});

// Serve the react app from the ejs index file when root is accessed
app.get('/', (req, res) => {
  res.render('index');
});

//Respond to socket connection
io.on('connection', function(socket) {
  console.info('a user connected');

  socket.on('send user', function(name) {
    socket.name = name;
    socket.push(socket.name);
    io.emit('send user', name);
    //console.info(users);
  });

  socket.on('chat message', function(msg) {
    console.info('message: '+ msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.info('a user disconnected');
  });
});

// Serve all other files in the public folder statically
app.use(express.static('public'));

// Listen for connections using the port and host specified in the config
server.listen(config.port, config.host, () => {
  console.info(`Express listening on port ${config.port}`);
});

// Export the server in case we want to integrate this in a larger system
export default app;
