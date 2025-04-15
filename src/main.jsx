import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

import ReactGA from "react-ga4";

ReactGA.initialize("G-2YMST8S8SY"); // replace with your Measurement ID
ReactGA.send("pageview");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
