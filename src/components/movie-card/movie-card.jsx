import React from "react";
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100" style={{ marginTop: '80px' }}>
      <Card.Img variant="top" src={movie.imageUrl} alt={`${movie.title} movie poster`} />
      <Card.Body className="card-body-container">
        <div className="card-content">
          <Card.Title style={{ marginTop: '20px' }}>{movie.title}</Card.Title>
          <Card.Text>{movie.director.name}</Card.Text>
        </div>
        <div className="card-action">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="link">
              More Info
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

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
};