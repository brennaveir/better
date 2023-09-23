import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

// import NavDropdown from 'react-bootstrap/NavDropdown';
import Auth from '../utils/auth.js';


function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Navbar expand="lg" className="navbar bg-body-tertiary fixed-top">
      <Container fluid>
        <Navbar.Brand href="#">Better</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
            <Nav.Link href="/">Feed</Nav.Link>
            </Nav>
            {/* <Nav.Link href="/Inbox">Inbox</Nav.Link> */}
            {Auth.loggedIn() ? (
            <>
              <Link className="m-2" to="/profile">
                {Auth.getProfile().data.username}
              </Link>
              
              <Button onClick={logout}>
                Logout
              </Button>
              
            </>
          ) : (
            <>
              <Button href="/login">
                Login
              </Button>
              <Button  href="/signup">
                Signup
              </Button>
            </>
          )}
          {/* </Nav> */}

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

