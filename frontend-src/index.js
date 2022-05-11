import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.js";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs/dist/grapes.min.js";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
)


if (module.hot) {
  module.hot.accept();
}