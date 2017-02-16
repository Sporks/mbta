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
    console.log(cell)
    return cell === null ? "TBD" : cell
  }

  render() {
    return (
      <div>
        <BootstrapTable data={this.state.trains.slice(0,15)} striped hover>
          <TableHeaderColumn isKey dataField='Origin'>Origin</TableHeaderColumn>
          <TableHeaderColumn dataFormat={ this.timeFormatter } dataField='ScheduledTime'>Time</TableHeaderColumn>
          <TableHeaderColumn dataField='Destination'>Destination</TableHeaderColumn>
          <TableHeaderColumn dataField='Trip'>Train</TableHeaderColumn>
          <TableHeaderColumn dataFormat={ this.trackFormatter } dataField='Track'>Track</TableHeaderColumn>
          <TableHeaderColumn dataField='Lateness'>Delay</TableHeaderColumn>
          <TableHeaderColumn dataField='Status'>Status</TableHeaderColumn>
        </BootstrapTable>
        <button
          onClick={() => {
            this.update();
          }}
        >
          Update Schedule
        </button>
      </div>

    );
  }
}
//
// <div>



// <ul>
//     {this.state.trains.map(train =>
//       <li key={train.row}>{train.timeRetrieved}</li>
//     )}
// </ul>
export default TrainSchedule;
