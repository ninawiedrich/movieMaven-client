import React from "react";
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" border='primary'
  >
    <Card.Img variant="top" src={movie.imageUrl} alt={`${movie.title} movie poster`} />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Text>{movie.director.name}</Card.Text>
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
      <Button variant="link">
        More Info
      </Button>
      </Link>
    </Card.Body>
  </Card>
  );
};

// export const movieCard = (props) => {
//   const { movie } = props;
//   return <div>{movieData.title}</div>;
// }

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    imageUrl: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};