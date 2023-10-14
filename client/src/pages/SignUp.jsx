import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function Signup() {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container className="signup-container">
<Row>
<Col>
<Image src="../public/betterLogo.png" />
</Col>
<Col>
    
    <Form 
    onSubmit={handleFormSubmit}
    >
      <Form.Group 
      className="mb-3" 
      controlId="email"
     >
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email" 
        name="email"
        placeholder="Enter email" 
        value={formState.email}
        onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We will never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control 
         name="username"
        type="username" 
        placeholder="username" 
        value={formState.username}
        onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
         name="password"
        type="password" 
        placeholder="Password" 
        value={formState.password}
        onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Signup
      </Button>
      <Form.Text className="text-muted m-3">
          Already have an account?
          <Link to="/login" className="m-1">Login</Link>
        </Form.Text>
    </Form>
</Col>
</Row>
    </Container>
  );
}

export default Signup;