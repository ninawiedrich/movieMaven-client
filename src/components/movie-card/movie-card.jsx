export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

// export const movieCard = (props) => {
//   const { movie } = props;
//   return <div>{movieData.title}</div>;
// }