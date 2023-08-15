import React from 'react';
import "./movie-view.scss";
import PropTypes from 'prop-types';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movie: movies, user, token, updateUserFavorites }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  const isFavorite = user && user.favoriteMovies ? user.favoriteMovies.includes(movieId) : false;

  const handleFavoriteClick = () => {
    // Determine the method based on whether the movie is already a favorite
    const method = isFavorite ? 'DELETE' : 'POST';

    fetch(`https://moviemaven-dfc40ecb1c33.herokuapp.com/users/${user.username}/movies/${movieId}`, {
      method,
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((updatedUser) => {
      // Update the local state with the updated user data
      updateUserFavorites(updatedUser);
    })
    .catch((error) => console.error('Error updating favorites:', error));
  };

return (
  <div className="movie-view">
    <div className="movie-image">
      <img src={movie.imageUrl} alt={movie.title} />
    </div>
    <div className="movie-content">
      <h2>{movie.title}</h2>
      <p><strong>Director:</strong> {movie.director.name}</p>
      <p><strong>Director's Bio:</strong> {movie.director.bio}</p>
      <p><strong>Director's Birth:</strong> {movie.director.birth}</p>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre.name}</p>
      <p><strong>Genre Description:</strong> {movie.genre.description}</p>
      <button onClick={handleFavoriteClick} className="favorite-button">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  </div>
);

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  updateUserFavorites: PropTypes.func.isRequired
};
}