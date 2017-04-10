// Capture all environment flags currently set
const env = process.env;

// Setup the port and host from environment vars or defulats
module.exports = {
  port: env.PORT || 8000,
  host: env.HOST || '0.0.0.0',
  browserSyncPort: 9000,

  // Return a fully qualified URL with host and port
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};
