import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) return;
  
    fetch("https://moviemaven-dfc40ecb1c33.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
})
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
      })

      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

    return (
      <Row className="justify-content-md-center">
      {!user ? ( 
       <Col md={5}>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
        </Col>
    ) : selectedMovie ? (
      <Col md={8}>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </Col>
    ) : movie.length === 0 ? ( 
    <div>The list is empty!</div> ) : (
    <>
      {movie.map((movie) => (
        <Col className="mb-5" key={movie._id} md={3}>
                <MovieCard 
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
                </Col>
            ))}
            <Button 
              onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}
            >
              Logout
            </Button>
          </>  
      )}
      </Row>
    );
};
