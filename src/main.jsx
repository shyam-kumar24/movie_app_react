import React from 'react';
import ReactDOM from 'react-dom/client';
import './movie.css'
import MovieApp from './index'
import GlobalState from './context/GlobalState';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GlobalState>
    <MovieApp />
  </GlobalState>
);

