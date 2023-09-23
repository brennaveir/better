import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Comments from '../components/Comments';
import AddComment from '../components/AddComment';

import { QUERY_SINGLE_BIT } from '../utils/queries';

const SingleBit = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { bitId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BIT, {
    // pass URL parameter
    variables: { bitId: bitId },
  });

  const bit = data?.bit || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {bit.bitAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          wrote this bit on {bit.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {bit.bitText}
        </blockquote>
      </div>

      <div className="my-5">
        <Comments comments={bit.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <AddComment bitId={bit._id} />
      </div>
    </div>
  );
};

export default SingleBit;
