import React, { useState } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import UserInfo from './user-info';
import FavoriteMoviesComponent from './favorite-movies';
import UpdateUser from './update-user';
import './profile-view.scss';

export const ProfileView = ({ user, token, setUser, movies, onLogout }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthDate);

  const favoriteMoviesIds = user.FavoriteMovies || [];
  const favoriteMovieList = movies.filter((movie) => {
    return favoriteMoviesIds.includes(movie._id);
  });

  const handleUpdate = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'Username':
        setUsername(value);
        break;
      case 'Password':
        setPassword(value);
        break;
      case 'Email':
        setEmail(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const data = {
      Username: username,
      Email: email,
      BirthDate: birthday
    };
  
    if (password) {
      data.Password = password;
    }
  
    fetch(`https://moviemaven-dfc40ecb1c33.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert("Update failed.");
      }
    }).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    })
  };

  const handleDeleteUser = () => {
    fetch(`https://moviemaven-dfc40ecb1c33.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        onLogout();
      } else {
        alert("something went wrong.")
      }
    })
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.username} email={user.email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser
                handleSubmit={handleSubmit}
                handleUpdate={handleUpdate}
                user={{ username, password, email }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMoviesComponent favoriteMovieList={favoriteMovieList} />
    </Container>
  );
}

export default ProfileView;