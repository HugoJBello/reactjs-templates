import React,{ Component } from 'react';
import { last_images_base64,getListImages, queryImagesBase64, queryImagesBase64Today, queryImagesBase64Date } from '../utils/image-backend-caller';
import ImageDisplayer from './ImageDisplayer';
import DatePicker from 'react-datepicker';
import dateFormat from 'dateformat'
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');

class ImageMenu extends Component {
  constructor() {
    super();
    this.state = { images: [],
                  limit: 10,
                  skip: 0,
                  date: moment(),
                  dateFormated: (new Date()).getTime()
};
    this.getLastImages();
    this.getLastImages = this.getLastImages.bind(this);
    this.queryImages = this.queryImages.bind(this);
    this.queryImagesToday = this.queryImagesToday.bind(this);
    this.queryImagesDate = this.queryImagesDate.bind(this);
    this.handleChangeLimit = this.handleChangeLimit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeDatePicker = this.handleChangeDatePicker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDatePicker(date) {
    var dateMiliseconds = date.toDate();
    var dateFormated = dateMiliseconds.getFullYear() + '-' +(dateMiliseconds.getMonth() + 1) + '-' +  dateMiliseconds.getDate();
    this.setState({ dateFormated: dateFormated });
    this.setState({date});
  }

  handleChangeLimit(event) {
    this.setState({ limit:event.target.value });
    console.log(event)
    //event.preventDefault();
  }
  handleChangeDate(event) {
    var dateSelector = event.target.value;
    var result =new Date();
    if (dateSelector!="today"){
      result=null;
    }
    this.setState({ date:result });
    //event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.date!=null){
      this.queryImagesDate()
    } else {
      this.queryImages();
    }
  }

  getLastImages() {
    last_images_base64().then((images) => {
      this.setState({ images:images });
    });
  }

  queryImages() {
    queryImagesBase64(this.state.limit,this.state.skip).then((images) => {
      this.setState({ images:images });
    });
  }
  queryImagesToday() {
    queryImagesBase64Today(this.state.limit,this.state.skip).then((images) => {
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
              <li className="list-group-item"><a onClick={() => {this.getLastImages()}}>Show last 40 images </a></li>
              <li className="list-group-item">
              <form onSubmit={this.handleSubmit}>
              <table>
              <tr>
                <th>Only last &ensp;</th>
                <th><select value={this.state.limit} name="numberImages" onChange={this.handleChangeLimit}>
                    <option value="1">1</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="100">100</option>
                    </select>
                </th>
              </tr>
              <tr>
                <th>Only from &ensp;
                </th>
                <th><DatePicker
                onChange={this.handleChangeDatePicker}
                selected={this.state.date}
                />
                </th>
              </tr>
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
