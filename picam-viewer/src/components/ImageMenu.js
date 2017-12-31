import React,{ Component } from 'react';
import { last_images_base64,getListImages, queryImagesBase64, queryImagesBase64Today, queryImagesBase64Date } from '../utils/image-backend-caller';
import ImageDisplayer from './ImageDisplayer';
import DateSelector from './DateSelector';
import DatePicker from 'react-datepicker';

var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

class ImageMenu extends Component {
  constructor() {
    super();
    this.state = { images: [],
                  limit: 30,
                  skip: 0,
                  date: moment(),
                  queryMode:"anyday",
                  showPicker:false,
                  dateFormated: this.formatDate(moment())
                };
    this.queryImages();
    this.queryImages = this.queryImages.bind(this);
    this.queryImagesDate = this.queryImagesDate.bind(this);
    this.handleChangeLimit = this.handleChangeLimit.bind(this);
    this.handleQueryMode = this.handleQueryMode.bind(this);
    this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDatePicker(date) {
      this.setState({ dateFormated: this.formatDate(date) });
      this.setState({date});
    }

  formatDate = (moment) => {
    var dateMiliseconds = moment.toDate();
    return dateMiliseconds.getFullYear() + '-' +(dateMiliseconds.getMonth() + 1) + '-' +  dateMiliseconds.getDate();
  }

  handleChangeLimit(event) {
    this.setState({ limit:event.target.value });
    //event.preventDefault();
  }

  handleQueryMode(event) {
    event.preventDefault();
    this.setState({ dateSelection:event.target.value });
    if (event.target.value!=="anyday"){
      this.setState({ showPicker:true });
    } else {
      this.setState({ showPicker:false });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("here  "+this.state.queryMode );
    if (this.state.queryMode !=="anyday"){
      this.queryImagesDate();
    } else {
      this.queryImages();
    }
  }

  queryImages() {
    queryImagesBase64(this.state.limit,this.state.skip).then((images) => {
      this.setState({ images:images });
    });
  }

  queryImagesDate() {
    queryImagesBase64Date(this.state.limit,this.state.skip,this.state.dateFormated).then((images) => {
      this.setState({ images:images });
    });
  }

  render() {
     return (
        <div>
          <div className="panel panel-default rightMenu">
          <div className="panel-heading">
            <h4>Query Images</h4>
          </div>
            <ul className="list-group">
              <li className="list-group-item">
              <form onSubmit={this.handleSubmit}>
              <table>
              <tbody>
              <tr>
                <td>Only last &ensp;</td>
                <td><select value={this.state.limit} name="numberImages" onChange={this.handleChangeLimit}>
                    <option value="1">1</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="100">100</option>
                    </select>
                </td>
              </tr>
              <tr>
                <td>Only from &ensp;
                </td>
                <td>
                  <DateSelector dateSelection={this.state.queryMode} handler = {this.handleQueryMode} />
                  { this.state.showPicker ?  <DatePicker
                                                  onChange={(date) => this.handleChangeDatePicker(date)}
                                                  selected={this.state.date}
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

        <ImageDisplayer images={this.state.images}/>

      </div>
    );
  }
}
export default ImageMenu;
