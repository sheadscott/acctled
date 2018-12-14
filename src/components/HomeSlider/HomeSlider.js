import React, { Component } from "react";
import axios from "axios";
import "./carousel.css";
import { Carousel } from "react-responsive-carousel";
// import image1 from "../../img/homeslide/1.jpeg";
// import image2 from "../../img/homeslide/2.jpeg";
// import image3 from "../../img/homeslide/3.jpeg";

export default class HomeSlider extends Component {
  state = {
    slideData: []
  };

  componentDidMount() {
    axios
      .get("https://instruction.austincc.edu/tled/wp-json/acf/v3/pages/226")
      .then(response => {
        const slideData = [];
        const slideShowItems =
          response.data.acf.hero_content[0].carousel_content;
        slideShowItems.forEach(function (slide) {
          const info = {};
          info.url = slide.image_content.url;
          info.description = slide.image_description;
          slideData.push(info);
        });
        console.log(slideData);
        // console.log("Slideshow data", slideShowItems);
        this.setState({ slideData });
      });
  }
  render() {
    return (
      <Carousel>
        {this.state.slideData.map((slide, index) => {
          function createMarkup(slide) {
            return {
              __html: slide.description + "<button>Learn More</button>"
            };
          }
          return (
            <div key={index}>
              <img src={slide.url} alt="" />
              <div
                className="legend"
                dangerouslySetInnerHTML={createMarkup(slide)}
              />
            </div>
          );
        })}
      </Carousel>
    );
  }
}
