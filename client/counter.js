import React from 'react';

/**
 * A counter button: tap the button to increase the count.
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
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

  render() {
    return (
      <div>
        <ul>
            {this.state.trains.map(train =>
              <li key={train.row}>{train.timeRetrieved}</li>
            )}
        </ul>

        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
            this.update();
          }}
        >
          Update Schedule
        </button>
      </div>

    );
  }
}
export default Counter;
