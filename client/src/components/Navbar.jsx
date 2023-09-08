import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Auth from '../utils/auth.js';


function Navigation() {
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
            <Nav.Link href="/Inbox">Inbox</Nav.Link>
            <Nav.Link href="/Profile">Profile</Nav.Link>
            {/* {Auth.loggedIn() ? (
              <>
              <Button className="my-button">Login</Button>
              </>
              ) : (
                <>
                <Nav.Link href="#" disabled>
            {Auth.getProfile().data.username}'s profile
            </Nav.Link>
                <Button className="my-button">Login</Button>
                </>
              )} */}
            
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

