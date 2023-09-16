import React from 'react';
import { useQuery } from '@apollo/client';

import Bits from '../components/Bits';
// import AddBit from '../components/AddBit';

import { QUERY_BITS } from '../utils/queries';

const Feed = () => {
  const { loading, data } = useQuery(QUERY_BITS);
  const bits = data?.bits || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          {/* <AddBit /> */}
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Bits
              bits={bits}
              title="some bits...."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Feed;
