import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_BIT } from '../utils/mutations';
import { QUERY_BITS, QUERY_ME } from '../utils/queries';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Auth from '../utils/auth';

function AddBit() {

    const [bitText, setBitText] = useState('');

    const [characterCount, setCharacterCount] = useState(0);
  
    const [addBit, { error }] = useMutation(ADD_BIT, {
      update(cache, { data: { addBit } }) {
        try {
          const { bits } = cache.readQuery({ query: QUERY_BITS });
  
          cache.writeQuery({
            query: QUERY_BITS,
            data: { bits: [addBit, ...bits] },
          });
        } catch (e) {
          console.error(e);
        }
  
        // update me object's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, bits: [...me.bits, addBit] } },
        });
      },
    });
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addBit({
          variables: {
            bitText,
            bitAuthor: Auth.getProfile().data.username,
          },
        });
  
        setBitText('');
        // window.location.assign('/')
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      if (name === 'bitText' && value.length <= 280) {
        setBitText(value);
        setCharacterCount(value.length);
      }
    };

    const refreshPage = () => { 
        window.location.reload(); 
    }
  return (
    <div className="bit-form">
    {Auth.loggedIn() ? (
        <>
        
        <p
            className={` ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
       <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Post a bit!</Form.Label>
        <Form.Control
        name="bitText"
        placeholder="Here's a new bit..."
        as="textarea" 
        rows={3}
        value={bitText}
        onChange={handleChange} 
/>
      </Form.Group>
      <div className="mb-2">
        <Button 
        variant="primary" 
        size="lg"
        type="submit"
        onClick={refreshPage}
        >
          Post
        </Button>{' '}
        </div>
    </Form> 
    </>
    ) : (
        <p>
          You need to be logged in to share your bits. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
    )

}
    

export default AddBit;