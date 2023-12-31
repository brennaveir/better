import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      
      });
console.log(data)
      Auth.login(data.login.token);
      
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  return (
    <>
    {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
            <Container className="login-container">
<Row>
<Col>
<Image src="/betterLogo.png" />
</Col>

      <Col>    
    <Form onSubmit={handleFormSubmit}> 
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        name="email" 
        id="email"
        type="email" 
        value={formState.email}
        placeholder="Enter email" 
         required
        onChange={handleChange}
        />
       <Form.Text className="text-muted">
          We will never share your email with anyone else.
        </Form.Text>
      </Form.Group>
<Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control 
        name="password"
        id="password"
        type="password"
        value={formState.password}
        placeholder="  password"
        required
        onChange={handleChange} 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Form.Text className="text-muted m-3">
          Don't have an account yet?
          <Link to="/signup" className="m-1">Sign up</Link>
        </Form.Text>
    </Form>
    </Col>  
    </Row>
    </Container>
      )}
      {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
        )}      
    </>
            
  );
}

export default Login;