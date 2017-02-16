import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

//Use style similar to https://daveceddia.com/ajax-requests-in-react/

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Counter),
    document.getElementById('mount')
  );
});
