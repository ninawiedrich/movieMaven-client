import{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    };

    fetch("https://moviemaven-dfc40ecb1c33.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        return response.json(); // if the response is not ok, try to parse it as json
      }
    })
    .then((data) => {
      if (data) { // if the response was not ok and could be parsed as json
        console.error("Signup failed:", data); // print out the parsed error message
        alert("Signup failed once again");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
  }

  return (
    <Container style={{ maxWidth: '400px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h3 style={{ color: '#00B4D8' }}>Signup</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="signUpFormUsername">
      <Form.Label>
        Username:
        </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="signUpFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
      </Form.Group>
      <Form.Group controlId="signUpFormEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="signUpFormBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
      <Button variant="primary" type="submit" style={{ backgroundColor: '#00B4D8', borderColor: '#00B4D8' }}>
        Signup
      </Button>
    </div>
  </Form>
  </Container>
);
};