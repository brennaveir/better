import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image';

import Auth from '../utils/auth.js';


function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  console.log("Navigation component is rendering");
  return (
    <Card>
      <ListGroup >
        <ListGroup.Item>
          <Link to="#"><Image src="/betterWithoutTagline.png" /></Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/">Feed</Link>
        </ListGroup.Item>
        <ListGroup.Item>
              <Link to="/profile">Profile</Link>
              </ListGroup.Item>
              <ListGroup.Item>
              <Link to="/profile">Inbox</Link>
               </ListGroup.Item>
              <ListGroup.Item>
              <Link to="/buddies">Buddies</Link>
              </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={logout}>
                Logout
              </Button>
              </ListGroup.Item>
           
         

        
      </ListGroup>
    </Card>
  );
}

export default Navigation;

