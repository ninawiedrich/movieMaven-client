import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export const LoginView = ({onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // prevents the default refresh/change of page
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    fetch("https://moviemaven-dfc40ecb1c33.herokuapp.com/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
      }).then((response) => response.json())
      .then((data) => {
      console.log("Login response:", data);
      if (data.user) {
      onLoggedIn(data.user, data.token);
      } else { 
      alert ("No such user.");
      }
  })
  .catch((e) => {
    alert("Something went wrong.");
  });
};

return (
  <Container style={{ maxWidth: '400px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h3 style={{ color: '#00B4D8' }}>Login</h3>
    <Form onSubmit={handleSubmit}>

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <div style={{ textAlign: 'right', marginTop: '10px' }}>
      <Button variant="primary" type="submit" style={{ backgroundColor: '#00B4D8', borderColor: '#00B4D8' }}>
        Login
      </Button>
    </div>
  </Form>
  </Container>
);
};