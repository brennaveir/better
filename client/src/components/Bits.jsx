import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';



const Bits = ({ bits, username }) => {
  console.log(bits)
  if (!bits.length) {
    return <h3>No Bits Yet</h3>;
  }
  

  return (
   <div>
   
    {bits &&
    bits.map((bit) => (
    <Card key={bit.id}>
    <Card.Body > 
     
<Card.Title >
  
        <Link to={`/profiles/${bit.bitAuthor}`}>{bit.bitAuthor}{username}</Link>
        <Card.Subtitle className="mb-2 text-muted">{bit.createdAt}</Card.Subtitle>
        </Card.Title>
      
      
      
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
