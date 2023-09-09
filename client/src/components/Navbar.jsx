import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
            {/* <Nav.Link href="/Inbox">Inbox</Nav.Link> */}
            <Nav.Link href="/profile">Profile</Nav.Link>
            {Auth.loggedIn() ? (
            <>
              <Nav.Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}
              </Nav.Link>
              <Nav.Link onClick={logout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">
                Login
              </Nav.Link>
              <Nav.Link  href="/signup">
                Signup
              </Nav.Link>
            </>
          )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            
            
            <Button className="my-button">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

