import React from 'react';
import { Col, Row, Figure, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FavoriteMoviesComponent({ favoriteMovieList }) {

  const removeFav = (movieId) => {
    let token = localStorage.getItem('token');
    let url =
      `https://moviemaven-dfc40ecb1c33.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movieId}`;
  
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
    .then((data) => {
      // Refresh the list or remove the movie visually after deletion
      // This depends on how you want to handle it
      window.location.reload(); // You can use a better approach to update the UI
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h2>Favorite Movies</h2>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(({ imageUrl, title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className='fav-movie'>
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={imageUrl} alt={title} />
                    <Figure.Caption>
                      {title}
                    </Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="secondary" onClick={() => removeFav(_id)}>Remove from list</Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavoriteMoviesComponent;