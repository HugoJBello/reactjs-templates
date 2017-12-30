import React, { Component } from 'react';

class DateSelector extends Component {

  constructor() {
    super();
  }

  render() {

    return (
      <div>
      <select value={this.props.dateSelection} onChange={this.props.handler}>
          <option value="anyday">anyday</option>
          <option value="Pick a date">Pick a date</option>
      </select>
      </div>
    );
  }
}

export default DateSelector;
