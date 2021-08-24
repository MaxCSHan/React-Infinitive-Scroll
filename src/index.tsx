import React from 'react';
import ReactDOM from 'react-dom';
import './asset/style/index.scss';
import App from './App';
import Gallery from './view/Gallery';

ReactDOM.render(
  <React.StrictMode>
    <Gallery />
  </React.StrictMode>,
  document.getElementById('root')
);

