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
    <Container fluid="lg">
      <Row>
        <Col></Col>
      </Row>
      <Row>
       <Col xs><Navigation /></Col>
       <Col xs={5}><AddBit />
       <Bits
              bits={bits}
              title="some bits...."
            /></Col>
        <Col xs><Sidebar /></Col>
      </Row>
    </Container>
    // <main>
    //   <div className="flex-row justify-center">
    //     <div
    //       className="col-12 col-md-10 mb-3 p-3"
    //       style={{ border: '1px dotted #1a1a1a' }}
    //     >
    //       <AddBit />
    //     </div>
    //     <div className="col-12 col-md-8 mb-3">
    //       {loading ? (
    //         <div>Loading...</div>
    //       ) : (
    //         <Bits
    //           bits={bits}
    //           title="some bits...."
    //         />
    //       )}
    //     </div>
    //   </div>
    // </main>

  );
};

export default Feed;
