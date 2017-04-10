import React from 'react';

import * as ApiHelper from '../apiHelper';

class Movie extends React.Component {
  constructor(props) {
    super(props);

    ApiHelper.fetchMovie(props.movieID).then((movieData) => {
      this.setState ({
        movieData: movieData
      });
    });

    this.state = {
      movieData: null
    };
  }

  render() {
    if(this.state.movieData == null) {
      return (<p>Fetching ...</p>);
    }

    return (<p>Name = {this.state.movieData.name}</p>);
  }
}

Movie.propTypes = {
  movieID: React.PropTypes.number.isRequired
};

export default Movie;
