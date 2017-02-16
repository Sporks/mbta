import React from 'react';
import ReactDOM from 'react-dom';
// import Temp from './Temp';
import TrainSchedule from './trainschedule';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import { Col, Panel } from 'react-bootstrap';


//Use style similar to https://daveceddia.com/ajax-requests-in-react/

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    // React.createElement(Temp),
    React.createElement(TrainSchedule),
    document.getElementById('mount')
  );
});
