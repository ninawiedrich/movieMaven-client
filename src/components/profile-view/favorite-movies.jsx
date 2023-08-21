import React from 'react';
import { Col, Row, Figure, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FavoriteMoviesComponent({ favoriteMovieList, removeFavoriteMovie }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12} style={{ marginBottom: '30px' }}>
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
                    <Figure.Caption style={{ marginTop: '20px' }}>
                      {title}
                    </Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="secondary" style={{ marginTop: '20px' }} onClick={() => removeFavoriteMovie(_id)}>Remove from list</Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavoriteMoviesComponent;