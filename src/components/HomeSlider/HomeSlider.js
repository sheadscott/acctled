import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./carousel.css";
import image1 from "../../img/homeslide/1.jpeg";
import image2 from "../../img/homeslide/2.jpeg";
import image3 from "../../img/homeslide/3.jpeg";
import { Carousel } from "react-responsive-carousel";

export default class HomeSlider extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <img src={image1} />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={image2} />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={image3} />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    );
  }
}
