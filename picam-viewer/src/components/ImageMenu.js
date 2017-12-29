import React,{ Component } from 'react';
import { last_images_base64,getListImages, queryImagesBase64, queryImagesBase64Today } from '../utils/image-backend-caller';
import ImageDisplayer from './ImageDisplayer';

class ImageMenu extends Component {
  constructor() {
    super();
    this.state = { images: [],
                  limit: 10,
                  skip: 0,
                  date: "anyday"};
    this.getLastImages();
    this.getLastImages = this.getLastImages.bind(this);
    this.queryImages = this.queryImages.bind(this);
    this.queryImagesToday = this.queryImagesToday.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ limit:event.target.value });
    console.log(event)
    //event.preventDefault();
  }
  handleChangeDate(event) {
    this.setState({ date:event.target.value });
    console.log(event)
    //event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.date=="today"){
      this.queryImagesToday()
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
                <th><select value={this.state.limit} name="numberImages" onChange={this.handleChange}>
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
                <th><select value={this.state.date} name="numberImages" onChange={this.handleChangeDate}>
                    <option value="anyday">anyday</option>
                    <option value="today">today</option>
                    </select>
                </th>
              </tr>
              </table>
              <input type="submit" className="btn btn-info" value="Submit" />
              </form></li>
            </ul>
        </div>
        <ImageDisplayer images={this.state.images}/>
      </div>
    );
  }
}
export default ImageMenu;
