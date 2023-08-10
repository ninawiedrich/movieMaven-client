import "./movie-view.scss";
import PropTypes from 'prop-types';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movie: movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie._id === movieId);
  
  return (
    <div>
      <div>
        <img className="w-100" src={movie.imageUrl} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director's Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Director's Birth: </span>
        <span>{movie.director.birth}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <Link to={`/`}>
      <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
      </Link>
   </div>
  );
};






