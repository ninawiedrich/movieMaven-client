import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UpdateUser({ handleSubmit, handleUpdate, user }) {
  return (
    <>
      <h4>Update</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            defaultValue={user.username}
            onChange={e => handleUpdate(e)}
            required
            placeholder="Enter a username"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            defaultValue={user.password}
            onChange={e => handleUpdate(e)}
            required
            placeholder="Enter password"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            defaultValue={user.email}
            onChange={e => handleUpdate(e)}
            required
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="date"
            name="birthay"
            defaultValue={user.birthday}
            onChange={e => handleUpdate(e)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default UpdateUser;