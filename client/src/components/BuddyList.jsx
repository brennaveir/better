import React from 'react';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';

const BuddyList = ({ buddies, title }) => {
    console.log(buddies)
  if (!buddies.length) {
    return <h3>No Buddies Yet</h3>;
  }

  return (
    <div>
        <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {buddies &&
          buddies.map((buddy) => (
           <div key={buddy._id} className="col-12 col-xl-6">
              
                  <h1>{buddy.username} </h1><br />
                  
               

                
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default BuddyList;
