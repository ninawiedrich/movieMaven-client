import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
  const [movie, setMovie] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {

    fetch("https://moviemaven-dfc40ecb1c33.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data)
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            title: movie.title,
            director: {
              name: movie.director.name,
              bio: movie.director.bio,
              birth: movie.director.birth
            },
            description: movie.description,
            genre: {
            name: movie.genre.name,
            description: movie.genre.description
            },
            imageUrl: movie.imageUrl,
            featured: movie.featured
          };
        });

        setMovie(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movie.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movie.map((movie) => (
        <MovieCard
          key={movie._id.$oid}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};