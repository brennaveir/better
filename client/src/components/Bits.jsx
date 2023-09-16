import React from 'react';
import { Link } from 'react-router-dom';



const Bits = ({
  bits,
  title,
 showUsername = true,
 showTitle= true
}) => {
  if (!bits.length) {
    return <h3>No Bits Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {bits &&
        bits.map((bit) => (
          <div key={bit._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${bit.bitAuthor}`}
                >
                  {bit.bitAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this bit on {bit.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this bit on {bit.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{bit.bitText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/bits/${bit._id}`}
            >
              Join the discussion on this bit.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Bits;
