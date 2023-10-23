import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Bits from '../components/Bits';
import AddBit from '../components/AddBit';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navbar';

import Auth from '../utils/auth'

import { QUERY_BITS } from '../utils/queries';

const Feed = () => {
  const { loading, data } = useQuery(QUERY_BITS);
  const bits = data?.bits || [];

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
}

  return (
    <Container className="feed-container">
      <Row>
       <Col><Navigation /></Col>
       <Col xs={6} className="bits-column">
        <AddBit />
       <Bits
              bits={bits}
              title="some bits...."
            />
            </Col>
        <Col><Sidebar /></Col>
      </Row>
    </Container>
  );
};

export default Feed;
