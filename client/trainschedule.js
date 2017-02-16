import React from 'react';

class TrainSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trains: [],
    };
  }

  componentDidMount() {
    let that = this;
    $.ajax({
      url: '/schedule',
      method: 'GET'
    }).done(function(data){
      let trains = data;
      that.setState( {trains} );
    });
  }

  update() {
    let that = this;
    $.ajax({
      url: '/schedule',
      method: 'GET'
    }).done(function(data){
      console.log(data[0].timeRetrieved);
      let trains = data;
      that.setState( {trains} );
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
        <div className='schedule'>
          <button className='update'
            onClick={() => {
              this.update();
            }}> Update Schedule </button>
        </div>
        <BootstrapTable data={this.state.trains.slice(0,18)} tableBodyClass='body' hover>
          <TableHeaderColumn columnClassName='origin'
            dataAlign='center' isKey dataField='Origin' width='150'>Origin</TableHeaderColumn>
          <TableHeaderColumn columnClassName='time'
            dataAlign='center' dataFormat={ this.timeFormatter } dataField='ScheduledTime' width='120'>Time</TableHeaderColumn>
          <TableHeaderColumn columnClassName='dest'
            dataAlign='center' dataField='Destination' width='200'>Destination</TableHeaderColumn>
          <TableHeaderColumn columnClassName='trip'
            dataAlign='center' dataField='Trip' width='70'>Train</TableHeaderColumn>
          <TableHeaderColumn columnClassName='track'
            dataAlign='center' dataFormat={ this.trackFormatter } dataField='Track' width='90'>Track</TableHeaderColumn>
          <TableHeaderColumn columnClassName='delay'
            dataAlign='center' dataField='Lateness' width='90'>Delay</TableHeaderColumn>
          <TableHeaderColumn columnClassName='status'
            dataAlign='center' dataField='Status' width='200'>Status</TableHeaderColumn>
        </BootstrapTable>

      </div>

    );
  }
}

export default TrainSchedule;
