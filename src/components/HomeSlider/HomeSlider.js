import React, { Component } from "react";
import axios from "axios";
import "./carousel.scss";
import { Carousel } from "react-responsive-carousel";
import styled from 'styled-components';
import { Img } from '../Elements/Elements';
import MediaContainer from '../MediaContainer/MediaContainer';
import { Container, Row, Column } from '../Grid/Grid';

export default class HomeSlider extends Component {
  state = {
    slideData: [],
    currentSlide: 0
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
          info.alt = slide.image_content.alt;
          info.title = slide.image_content.title;
          info.url = slide.image_content.url;
          info.sizes = slide.image_content.sizes;
          info.description = slide.image_description;
          slideData.push(info);
        });
        console.log(slideData);
        // console.log("Slideshow data", slideShowItems);
        this.setState({ slideData });
      });
  }

  changeCarousel = (slide) => {
    this.setState({ currentSlide: slide });
  }
  render() {
    return (
      <React.Fragment>
        <Carousel
          showThumbs={false}
          showArrows={true}
          showStatus={false}
          showIndicators={false}
          selectedItem={this.state.currentSlide}
        >
          {this.state.slideData.map((slide, index) => {
            return (
              <div key={index} className="slide">


                <MediaContainer className="slide__wrapper">
                  {mediaLoaded => <Img src={slide.url} sizes={slide.sizes} alt={slide.alt} onLoad={mediaLoaded} className="slide__image" />}
                </MediaContainer>


                <div className="legend">
                  <Container>
                    <Row>
                      <SlideText dangerouslySetInnerHTML={{ __html: slide.description }} />
                    </Row>
                  </Container>
                </div>
              </div>
            );
          })}
        </Carousel>

        <CarouselControls>
          {this.state.slideData.map((item, index) => (
            <li key={`thumbnail-${item.url}`}>
              <CarouselControl onClick={() => { this.changeCarousel(index) }} bg={item.url} title={item.title}>
                <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>Skip to Slide {index + 1}</div>
                <div>{item.title}</div>
              </CarouselControl>
            </li>
          ))}
        </CarouselControls>
      </React.Fragment>
    );
  }
}

const SlideText = styled(Column)`
  h2 {
    color: white;
    font-size: 1.5rem;
    margin: 0;
  }
    h3 {
    color: white;
    font-size: 3rem;
    margin: 0;
    font-weight: 700;
  }
  p {
    color: #e7e2a3;
  }
  a.button {
    display: inline-block;
    margin-top: 2rem;
    background: white; 
    padding: 1rem 2rem; 
    text-decoration: none; 
    color: #113953;
  }
`;

const CarouselControls = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -50px;

  li:first-child button {
    border-left-width: 8px;
  }

  li:last-child button {
    border-right-width: 8px;
  }
`;

const colors = {
  'On Campus Assistance': '#295b82',
  'Library Help': '#7d484c',
  'Blackboard': '#ad8d6e',
  'Technology': '#20a2b1',
  'Learning Depot': '#9977a7'
};

const CarouselControl = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  position: relative;
  width: 150px;
  height: 100px;
  border: 4px solid white;
  border-top-width: 8px;
  text-transform: uppercase;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  font-family: Montserrat;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.3);
  outline: none;

  &:before {
    content: '';
    display: block;
    background: ${props => colors[props.title]};
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    bottom: 0;
    z-index:1;
    transition: opacity 0.3s;
  }

  div {
    position: relative;
    z-index: 2;
  }

  &:focus:before {
    opacity: 1;
  }
  
  background-color: #7fb7e3;
  background-color: ${props => colors[props.title]};

  background-image: url(${props => props.bg});
  background-position: center center;
  // background-blend-mode: overlay;
  // background-blend-mode: hard-light;
  background-blend-mode: soft-light;
  background-size: cover;

img {
  display: block;
  width: 100 %;
  height: 100 %;
  object-fit: cover;
  object-position: center;
}
`;