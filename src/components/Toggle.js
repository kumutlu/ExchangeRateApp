import React, { Component } from 'react';
import Bank from './Bank';
import '../App.css';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.toggleDiv = this.toggleDiv.bind(this);
  }

  toggleDiv = () => {
    const { show } = this.state;
    this.setState({
      show: !show
    });
  };
  render() {
    return (
      <div>
        <div>
          <button className='bankButton button2' onClick={this.toggleDiv}>
            Exchange Currencies{' '}
          </button>{' '}
          {this.state.show && <Box />}{' '}
        </div>{' '}
      </div>
    );
  }
}

class Box extends Component {
  render() {
    return (
      <div>
        <Bank />
      </div>
    );
  }
}

export default Toggle;
