import React, { Component } from 'react';

class ImageList extends Component {

  constructor() {
    super();
  }
  renderRow(props) {
      return (
        <tr key={props.id}>
          <td>{ props.filename }</td>
          <td>{ props.path }</td>
          <td>{ props.date_taken }</td>
        </tr>
      );
    }
  render() {
    return (
      <table>
      <tbody>
      <tr>
        <th>
          Filename
        </th>
        <th>
          Path
        </th>
        <th>
          Date taken
        </th>
      </tr>
        { this.props.images.map(this.renderRow) }
      </tbody>
      </table>
    );
  }
}

export default ImageList;
