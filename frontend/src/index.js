import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

import { getToken } from "./token";

const root = ReactDOM.createRoot(document.getElementById('root'));

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql/' });

const authLink = setContext((_, { headers }) => {

  // get the authentication token from local storage if it exists
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
