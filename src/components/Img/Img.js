import React from 'react';
import objectFitImages from 'object-fit-images';

class Img extends React.Component {
  componentDidMount = () => {
    objectFitImages();
  }

  render() {
    const props = this.props;
    if (props.sizes) {
      return <img
        srcSet={`${props.sizes.medium} 480w, ${props.sizes.medium_large} 800w, ${props.sizes.large} 1024w, ${props.sizes.x_large} 2000w`}
        sizes='100vw'
        src={props.sizes.large}
        {...props} />
    }

    return <img src={props.src} {...props} />
  };
}

export default Img;