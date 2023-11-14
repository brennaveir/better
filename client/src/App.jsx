import React from 'react';
import { Outlet, Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Feed from './pages/Feed.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Footer from './components/Footer.jsx';
import SingleBit from './pages/SingleBit.jsx'
import Buddies from './pages/Buddies.jsx'



const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



 function App() {
  return (
    <>
      <Container className="page-container bg-info" fluid>
        <Row className>
       
          
            
            <ApolloProvider client={client}>
              <Router>
               
                 <Col className= "m-5">
                <Routes className='flex-row justify-flex-center'>
                 
                  <Route
                    path="/login"
                    element={<Login />}
                  />
                  <Route
                    path="/signup"
                    element={<SignUp />}
                  />
                
                  <Route
                    path="/"
                    element={<Feed />}
                  >
                  <Route
                    path="/profile"
                    element={<Profile />}
                  />
                  <Route
                    path="/profiles/:username"
                    element={<Profile />}
                  />
                  <Route
                    path="/bits/:bitId"
                    element={<SingleBit />}
                  />
                  <Route
                    path="/buddies"
                    element={<Buddies />}
                  />
                  <Route
                    path='*'
                    element={<h1 className="display-2">Wrong page!</h1>}
                  />
</Route>
                </Routes>




                

</Col>
              </Router>

            </ApolloProvider>
          
          
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;