import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
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
    <Form 
    onSubmit={handleFormSubmit}
    > 
      <Form.Group 
      className="mb-3" 
      
      >
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
    </Form>
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