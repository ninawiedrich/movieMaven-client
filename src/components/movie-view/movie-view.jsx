import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imageUrl} alt={movie.title} />
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.object.isRequired,
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
  onBackClick: PropTypes.func.isRequired,
};
Please note that .isRequired should be used carefully. It should only be applied to props that are truly required for the component to function. If a prop is optional and has a default value provided via defaultProps, then it should not be marked as isRequired.




User
on all? make that sence by app about movies??
ChatGPT
That's a great question. Marking a prop as isRequired should depend on the specific logic and requirements of your application. If your component requires a certain prop to function correctly, then it should be marked as isRequired. If the prop is optional or the component has default prop values, then it is not necessary to mark it as isRequired.

For instance, in the context of your movie application, if you can render a movie without the director data, then you wouldn't need to mark those director props as isRequired. Conversely, if the component absolutely needs the title of a movie to render correctly, then you should mark title as isRequired.

Here's a slightly adjusted version of your prop types:

jsx
Copy code
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.string,
    }),
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    imageUrl: PropTypes.string,
    featured: PropTypes.bool,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.string,
    }),
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    imageUrl: PropTypes.string,
    featured: PropTypes.bool,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};




