import React, { Component } from 'react';
import axios from 'axios';
import './carousel.scss';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import { Img } from '../Elements/Elements';
import MediaContainer from '../MediaContainer/MediaContainer';
import { Container, Row, Column } from '../Grid/Grid';
import Parser from '../Parser/Parser';

export default class HomeSlider extends Component {
  state = {
    slideData: [],
    currentSlide: 0
  };

  componentDidMount() {
    axios
      .get('https://instruction.austincc.edu/tled/wp-json/acf/v3/pages/226')
      .then(response => {
        const slideData = [];
        const slideShowItems =
          response.data.acf.hero_content[0].carousel_content;
        slideShowItems.forEach(function(slide) {
          const info = {};
          info.alt = slide.image_content.alt;
          info.title = slide.image_content.title;
          info.url = slide.image_content.url;
          info.sizes = slide.image_content.sizes;
          info.description = slide.image_description;
          slideData.push(info);
        });

        this.setState({ slideData });
      });
  }

  changeCarousel = slide => {
    this.setState({ currentSlide: slide });
  };
  render() {
    return (
      <React.Fragment>
        <Carousel
          showThumbs={false}
          showArrows={true}
          showStatus={false}
          showIndicators={false}
          selectedItem={this.state.currentSlide}
          onChange={slide => {
            this.changeCarousel(slide);
          }}
        >
          {this.state.slideData.length &&
            this.state.slideData.map((slide, index) => {
              return (
                <Slide
                  key={index}
                  className="slide"
                  id={slide.title}
                  index={index}
                >
                  <MediaContainer
                    ratio="41.4%"
                    maxHeight="700px"
                    className="slide__wrapper"
                  >
                    {mediaLoaded => (
                      <Img
                        src={slide.url}
                        sizes={slide.sizes}
                        alt={slide.alt}
                        onLoad={mediaLoaded}
                        className="slide__image"
                      />
                    )}
                  </MediaContainer>

                  <div className="legend">
                    <Container>
                      <Row>
                        <SlideText>
                          <Parser>{slide.description}</Parser>
                        </SlideText>
                      </Row>
                    </Container>
                  </div>
                </Slide>
              );
            })}
        </Carousel>

        <CarouselControls>
          {this.state.slideData.map((item, index) => (
            <li key={`thumbnail-${item.url}`}>
              <CarouselControl
                onClick={() => {
                  this.changeCarousel(index);
                }}
                className={this.state.currentSlide === index ? 'active' : null}
                bg={item.url}
                title={item.title}
                index={index}
              >
                <div
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden'
                  }}
                >
                  Skip to Slide {index + 1}
                </div>
                <div>{item.title}</div>
              </CarouselControl>
            </li>
          ))}
        </CarouselControls>
      </React.Fragment>
    );
  }
}

const colors = ['#295b82', '#7d484c', '#ad8d6e', '#20a2b1', '#9977a7'];

const Slide = styled.div`
  h3 {
    border-bottom: 4px solid white;

    border-bottom-color: ${props => colors[props.index]};
  }
`;

const SlideText = styled(Column)`
  h2 {
    color: white;
    font-size: 1rem;
    margin: 0;
    @media (min-width: 600px) {
      font-size: 1.5rem;
    }
  }
  h3 {
    color: white;
    font-size: 1.5rem;
    margin: 0;
    font-weight: 700;
    @media (min-width: 700px) {
      font-size: 2rem;
    }
    @media (min-width: 800px) {
      font-size: 3rem;
    }
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
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  width: 100%;
  max-width: 75em;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -50px;

  li:first-child button {
    border-left-width: 8px;
  }

  // li:last-child button {
  //   border-right-width: 8px;
  // }
`;

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
  border-left-width: 0;
  border-right-width: 8px;
  text-transform: uppercase;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  font-family: Montserrat;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
  outline: none;
  margin-bottom: 0.75rem;

  &:before {
    content: '';
    display: block;
    background: ${props => colors[props.index]};
    height: 100%;
    width: 100%;
    opacity: 1;
    position: absolute;
    // bottom: 0;
    left: 0;
    top: 0;
    z-index: -1;
    transition: transform 0.3s;
  }

  div {
    position: relative;
    z-index: 2;
    transition: transform 0.3s;
  }

  &:focus,
  &.active {
    div {
      transform: translate3d(0, -0.5rem, 0);
    }
    &:before {
      transform: translate3d(0, 0.75rem, 0);
    }
  }

  background-color: #7fb7e3;
  background-color: ${props => colors[props.index]};

  background-image: url(${props => props.bg});
  background-position: center center;
  // background-blend-mode: overlay;
  // background-blend-mode: hard-light;
  background-blend-mode: soft-light;
  background-size: cover;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
