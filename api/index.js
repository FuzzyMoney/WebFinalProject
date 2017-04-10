import express from 'express';
import movies from './movies';

const router = express.Router();

router.get('/movies', (req, res) => {
  let reduced = movies.map((movie) => {
    return {
      id: movie.id, name: movie.name, genre: movie.genre,
      image: movie.image, year: movie.year, rating: movie.rating
    };
  });

  res.json(reduced);

});

router.get('/movies/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let desiredMovie = movies.find((movie) => {
    if(movie.id == id) return true;
    else return false;
  });

  if(desiredMovie) {
    res.json(desiredMovie);
  } else {
    res.json({});
  }
});

export default router;
