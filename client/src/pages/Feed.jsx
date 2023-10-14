import React from 'react';
import { useQuery } from '@apollo/client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Bits from '../components/Bits';
import AddBit from '../components/AddBit';
import Sidebar from '../components/Sidebar';
import Navigation from '../components/Navbar';

import { QUERY_BITS } from '../utils/queries';

const Feed = () => {
  const { loading, data } = useQuery(QUERY_BITS);
  const bits = data?.bits || [];

  return (
    <Container>
      <Row>
       <Col><Navigation /></Col>
       <Col xs={6}>
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
