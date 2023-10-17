import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';



const Bits = ({ bits, title, showUsername = true, showTitle = true}) => {
  if (!bits.length) {
    return <h3>No Bits Yet</h3>;
  }
  

  return (
   <div>
   {showTitle && <h3>{title}</h3>}
    {bits &&
    bits.map((bit) => (
    <Card key={bit.id}>
    <Card.Body > 
     {showUsername ? ( 
<Card.Title >
  
        <Link to={`/profiles/${bit.bitAuthor}`}>{bit.bitAuthor}</Link>
        <Card.Subtitle className="mb-2 text-muted">{bit.createdAt}</Card.Subtitle>
        </Card.Title>
      
      ) : (
        <>
        <Link to={`/profiles/${bit.bitAuthor}`}>You</Link>
        <Card.Subtitle className="mb-2 text-muted">{bit.createdAt}</Card.Subtitle>
        </>
      )}
<Card.Text>
        {bit.bitText}
      </Card.Text>
      <Link to={`/bits/${bit._id}`}>💬</Link>
      
    </Card.Body>
     </Card>
  ))}
  
   </div>
    
  )
      }

 


export default Bits;
