import React from 'react';
import ReactDOM from 'react-dom';
import  App  from './App';

console.log('index');

//TODO: fix react 18 warning
//https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
ReactDOM.render(
  <React.StrictMode>
      <App></App>
  </React.StrictMode>,
  document.getElementById('root'),
);