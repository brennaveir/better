import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import Navigation from './components/Navbar.jsx';
import Feed from './pages/Feed.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Footer from './components/Footer.jsx';


const httpLink = createHttpLink({
  uri: '/graphql',
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
    <ApolloProvider client={client}>
      <Router>
    <div className='flex-column justify-flex-start min-100-vh'>
          <Navigation />
          <div className= 'container m-5 p-5'>
          <Routes>
            <Route 
              path="/" 
              element={<Feed/>} 
            /> 
            <Route 
              path="/profile" 
              element={<Profile/>} 
            /> 
             <Route 
              path="/login" 
              element={<Login/>} 
            />
            <Route 
                path="/signup" 
                element={<SignUp />}
              />
            <Route 
              path='*' 
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
        </div>
        <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App
