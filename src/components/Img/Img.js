import React from 'react';
import styled from 'styled-components';
import objectFitImages from 'object-fit-images';

class Img extends React.Component {
  componentDidMount = () => {
    objectFitImages();
  }

  render() {
    const props = this.props;
    /*
    if (props.sizes) {
      return <img
        srcSet={`${props.sizes.medium} 480w, ${props.sizes.medium_large} 800w, ${props.sizes.large} 1024w, ${props.sizes.x_large} 2000w`}
        sizes='100vw'
        src={props.sizes.large}
        {...props} />
    }
    */

    return (
      <Wrapper>
      <img src={props.src} alt={props.alt} {...props}/>
      </Wrapper>
    );
  };
}

export default Img;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 41.425%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    object-fit: cover;
    object-position: center;
  }
`;