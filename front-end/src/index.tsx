import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'app/App';
import reportWebVitals from './app/reportWebVitals';
import { Provider } from 'react-redux';
import store from 'app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( 
  <Provider store={store}>
    <App /> 
  </Provider>
); 

reportWebVitals();
