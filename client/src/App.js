import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Favorites from './pages/Favorites';
import SingleProvider from './pages/SingleProvider';
import { StoreProvider } from "./utils/GlobalState";
import AddPet from './pages/AddPet';
import PetList from './components/PetList';
import ReservationHistory from './pages/ReservationHistory';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />}
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/addPet" 
                element={<AddPet />} 
              />
              <Route 
                path="/pets" 
                element={<PetList />} 
              />
              <Route 
                path="/provider/:id" 
                element={<SingleProvider />}
              />
              <Route 
                path="/favorites/:id" 
                element={<Favorites />}
              />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}


export default App;
