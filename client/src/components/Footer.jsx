import React from 'react';
import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (
    <Nav className='d-flex justify-content-center bg-white' defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="https://github.com/brennaveir">Github</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="https://brennaveir.github.io/Devfolio/">Portfolio</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="mailto:brennaveir@gmail.com">Email</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Footer;