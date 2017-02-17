import React from 'react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class TrainSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trains: [],
      time: null,
      day: null,
      date: null
    };
  }

  componentDidMount() {
    this.update();
    // Update the clock
    let clock = () => {
      let d = new Date();
      this.setState( {
        time: d.toLocaleTimeString(),
        day: DAYS[d.getDay()],
        date: d.toLocaleDateString()
      } );
    };
    let timerClock = setInterval(clock, 1000);

    let sched = () => {
      this.update();
    };
    let timerSched = setInterval(sched, 30000);
  }

  // Method to update the schedule
  update() {
    $.ajax({
      url: '/schedule',
      method: 'GET'
    }).done(data =>{
      let trains = data;
      this.setState( {trains} );
    });
  }

  timeFormatter(cell) {
    let d = new Date(cell);
    return (d.toLocaleTimeString());
  }

  trackFormatter(cell) {
    return cell === null ? "TBD" : cell;
  }

  render() {
    return (
      <div>
        <div className='header'>
          <div className='info'>
            <div className='day disp'> {this.state.day} </div>
            <div className='board'> Information Board </div>
            <div className='currtime'> CURRENT TIME </div>
          </div>
          <div className='datetime'>
            <div className='date disp'> {this.state.date} </div>
            <div className='time disp'> {this.state.time} </div>
          </div>
        </div>

        <BootstrapTable data={this.state.trains.slice(0,18)} bordered={false} headerStyle={ { 'text-align': '#00ff00' } }
        tableHeaderClass='tableheader' tableBodyClass='tablebody'>
          <TableHeaderColumn columnClassName='yellowtext disp'
            dataAlign='left' isKey dataField='Origin' width='150'>Origin</TableHeaderColumn>
          <TableHeaderColumn columnClassName='yellowtext disp'
            dataAlign='right' dataFormat={ this.timeFormatter } dataField='ScheduledTime' width='120'>Time</TableHeaderColumn>
          <TableHeaderColumn columnClassName='yellowtext disp'
            dataAlign='left' dataField='Destination' width='200'>Destination</TableHeaderColumn>
          <TableHeaderColumn columnClassName='yellowtext disp'
            dataAlign='left' dataField='Trip' width='70'>Train</TableHeaderColumn>
          <TableHeaderColumn columnClassName='yellowtext disp'
            dataAlign='center' dataFormat={ this.trackFormatter } dataField='Track' width='90'>Track</TableHeaderColumn>
          <TableHeaderColumn columnClassName='greentext disp'
            dataAlign='center' dataField='Lateness' width='90'>Delay</TableHeaderColumn>
          <TableHeaderColumn columnClassName='greentext disp'
            dataAlign='left' dataField='Status' width='200'>Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default TrainSchedule;
