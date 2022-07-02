import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import firebaseApp from './services/firebase';
import ClientRepository from './services/clientRepository';

const clientRepository = new ClientRepository();

ReactDOM.render(
  <React.StrictMode>
    <App clientRepository={clientRepository}/>
  </React.StrictMode>,
  document.getElementById('root')
);

