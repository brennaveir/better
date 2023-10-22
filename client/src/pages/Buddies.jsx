import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom'


import BuddyList from '../components/BuddyList'

import Auth from '../utils/auth'

import { QUERY_BUDDIES } from '../utils/queries';

const Buddies = () => {
  console.log("hello")
    const { loading, data } = useQuery(QUERY_BUDDIES);
    console.log(data)
    const buddies = data.buddies[0].buddies || [];
  console.log(buddies)
    if (!Auth.loggedIn()) {
      return <Navigate to="/signup" />;
  }
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BuddyList
              buddies={buddies}
              title="Here's the current roster of friends..."
            />
          )}
        </div>
      </div>
    </main>
  );
};
  
  export default Buddies;