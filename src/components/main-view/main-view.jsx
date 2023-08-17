import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const storedToken = localStorage.getItem("token");
  const storedUserJSON = localStorage.getItem("user");
  const storedUser = storedUserJSON && storedUserJSON !== "undefined" ? JSON.parse(storedUserJSON) : null; // Additional check here
  const [movie, setMovie] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const updateUserFavorites = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const removeFavoriteMovie = (movieId) => {
    let url = `https://moviemaven-dfc40ecb1c33.herokuapp.com/users/${user.username}/movies/${movieId}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to remove favorite movie');
      }
      return response.json();
    })
    .then((updatedUser) => {
      updateUserFavorites(updatedUser);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    console.log("useEffect is being called");
    console.log("Token before fetch:", token);
    if (!token) return;
  
    fetch("https://moviemaven-dfc40ecb1c33.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
})
      .then((response) => {
        console.log("Raw response:", response);
        return response.json();
      })
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
        console.log("Movies set in state:", moviesFromApi);
      })

      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

    return (
      <BrowserRouter>
            <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                           <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                  </Col>
                )}
              </>

            }
          />
  
         <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movie.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movie={movie}
                      user={user}
                      token={token}
                      updateUserFavorites={updateUserFavorites}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movie.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movie.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

<Route
  path='/users'
  element={
    <>
      {user ? (
        <Col>
          <h2 style={{color: '#606060', marginTop: '80px'}}>
            My profile settings
          </h2>
          <ProfileView
            onLogout={() => {
              setUser(null);
              setMovie([]);
              localStorage.removeItem('user');
              localStorage.removeItem('token');
            }}
            removeFavoriteMovie={removeFavoriteMovie}
            user={user}
            token={token}
            movies={movie}
            setUser={setUser}
          />
        </Col>
      ) : (
        <Navigate to='/login' replace />
      )}
    </>
  }
/>
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
