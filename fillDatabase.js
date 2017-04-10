var db = require('./api/db');
var movies = require('./api/movies.json');

if(db === undefined) {
  console.error('Database connection failed');
} else {
  movies.forEach(function (movie) {
    db.save(movie, function(err, res) {
      if(err != null) { console.info(err); }
      else { console.info(res); }
    });
  });
}
