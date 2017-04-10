import axios from 'axios';

export const fetchMovie = (movieID) => {
  axios.get(`/api/movies/${movieID}`).then((res) => {
    return res.data;
  });
};

export const fetchMovies = () => {
  axios.get('/api/movies').then((res) => {
    return res.data;
  });
};
