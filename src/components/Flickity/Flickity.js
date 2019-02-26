import React from 'react';
// import $ from 'jquery';
import Flickity from 'flickity';
import styled from 'styled-components';
import MediaContainer from '../MediaContainer/MediaContainer';
import { Img } from '../Elements/Elements';
import Parser from '../Parser/Parser';
import uuidv1 from 'uuid/v1';

import 'flickity/css/flickity.css';

class FlickityCarousel extends React.Component {
  state = { id: null };

  componentWillMount() {
    this.setState({ id: uuidv1() });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    new Flickity(this.carouselContainer, {
      // options
      cellAlign: 'left',
      contain: true,
      wrapAround: true
    });
  }

  render() {
    return (
      <Carousel
        height={this.props.height}
        ref={element => (this.carouselContainer = element)}
        className="carousel"
      >
        {this.props.layout.carousel_content.map((item, index) => {
          if (item.acf_fc_layout === 'image') {
            return (
              <Cell
                key={`carousel-${this.state.id}-${index}`}
                height={this.props.height}
              >
                <MediaContainer ratio={this.props.height}>
                  {mediaLoaded => (
                    <Img
                      onLoad={mediaLoaded}
                      sizes={item.image_content.sizes}
                      alt={item.image_content.alt}
                    />
                  )}
                </MediaContainer>
              </Cell>
            );
          }
          return (
            <Cell
              key={`carousel-${this.state.id}-${index}`}
              height={this.props.height}
            >
              <Parser>{item.html_markup}</Parser>
            </Cell>
          );
        })}
      </Carousel>
    );
  }
}

export default FlickityCarousel;

const Carousel = styled.div``;

const Cell = styled.div`
  width: 100%;
  height: ${props => props.height};
  margin-right: 10px;
  background: #8c8;
  border-radius: 5px;
`;
