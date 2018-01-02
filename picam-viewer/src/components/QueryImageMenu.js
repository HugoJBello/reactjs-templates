import React, { Component } from 'react';
import DateSelector from './DateSelector';
import DatePicker from 'react-datepicker';

class QueryImageMenu extends Component {

  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 500;

    return (
      <div className={
        isMobile ? 'panel panel-default' : 'panel panel-default rightMenu'
      }>
      <div className="panel-heading">
        <h4>Query Images</h4>
      </div>
        <ul className="list-group">
          <li className="list-group-item">
          <form onSubmit={this.props.handleSubmit}>
          <table>
          <tbody>
          <tr>
            <td>Only last &ensp;</td>
            <td><select value={this.props.limit} name="numberImages" onChange={this.props.handleChangeLimit}>
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="all">all</option>
                </select>
            </td>
          </tr>
          <tr>
            <td>Only from &ensp;
            </td>
            <td>
              <select value={this.props.queryMode} onChange={this.props.handleQueryMode}>
                  <option value="anyday">anyday</option>
                  <option value="Pick a date">Pick a date</option>
              </select>
              { this.props.showPicker ?  <DatePicker
                                              onChange={(date) => this.props.handleChangeDatePicker(date)}
                                              selected={this.props.date}
                                              /> : null }
            </td>
          </tr>
          </tbody>
          </table>
          <input type="submit" className="btn btn-info" value="Submit" />
          </form>
          </li>
        </ul>
    </div>
    );
  }
}

export default QueryImageMenu;
