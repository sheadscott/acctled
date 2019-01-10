import React, { Component } from 'react';
import Axios from 'axios';

import { Container, Row, Column } from '../Grid/Grid';
import ACF from '../ACF/ACF';
import { Section, Img, Heading } from '../Elements/Elements';
import MediaContainer from '../MediaContainer/MediaContainer';

// import 'bootstrap/dist/css/bootstrap.css';

const HeroImage = ({ data }) => {
  // check if hero image has a description
  if (data.image_description) {
    return (
      <div className="container">
        <figure className="hero-content" style={{ margin: 0 }}>
          <MediaContainer>
            {mediaLoaded => <Img src={data.image_content.url} sizes={data.image_content.sizes} alt={data.image_content.alt} onLoad={mediaLoaded} />}
          </MediaContainer>
          <figcaption style={{ textAlign: 'right', opacity: 0.5, fontStyle: 'italic' }}>
            {data.image_description}
          </figcaption>
        </figure>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="hero-content">
        <MediaContainer>
          {mediaLoaded => <Img src={data.image_content.url} sizes={data.image_content.sizes} alt={data.image_content.alt} onLoad={mediaLoaded} />}
        </MediaContainer>
      </div>
    </div>
  )
}

const HeroHTML = ({ data }) => (
  <div className="container">';
    <div className="hero-content">
      <div dangerouslySetInnerHTML={{ __html: data.html_markup }} />
    </div>
  </div>
);

const HeroCarousel = ({ data }) => {
  return <div>Hero Carousel</div>
  // <div className="container"><div className="hero main-carousel"></div></div>
  //   const $carouselContainer = $('.main-carousel');

  //   const carouselLength = ACFData.hero[0].carousel_content.length;

  //   let innerCarousel = '';

  //   for (let i = 0; i < carouselLength; i++) {
  //     var img = getImage(ACFData.hero[0].carousel_content[i].image_content, ACFData.hero[0].image_alt_text, true);
  //     let imgHTML = '<div className="carousel-cell">' + img + '</div>';

  //     addToCarousel(imgHTML);
  //     if (i === carouselLength - 1) {
  //       $carouselContainer.append(innerCarousel);
  //       createCarousel();
  //     }
  //   };

  //   function addToCarousel(imgHTML) {
  //     innerCarousel += imgHTML;
  //   }

  //   function createCarousel() {
  //     $carouselContainer.flickity({
  //       // options
  //       contain: true,
  //       cellAlign: 'left',
  //       lazyLoad: true,
  //       draggable: true,
  //       wrapAround: true,
  //       accessibility: true,
  //       prevNextButtons: true,
  //       autoPlay: 4000,
  //       pageDots: true,
  //       imagesLoaded: true,
  //       // fullscreen: true,
  //     });
  //   }
  // }
}


export default class WPPage extends Component {
  state = {
    slug: '',
    pageContent: null
  }

  getData(slug) {
    // console.log('component received new props', slug);

    Axios.get(`https://instruction.austincc.edu/tled/wp-json/wp/v2/pages?slug=${slug}`).then(response => {
      this.setState({
        pageContent: response.data[0],
        slug: slug
      })
    });
  }
  componentDidMount() {
    if (this.props.match.params.slug) {
      this.getData(this.props.match.params.slug);
    }
  }

  componentWillReceiveProps(newProps) {
    const slug = newProps.match.params.slug;
    if (slug !== this.state.slug) {
      this.getData(slug);
    }
  }

  render() {
    const pageContent = this.state.pageContent;
    const ACFData = pageContent ? this.state.pageContent.acf : null;

    return (
      <div>
        <Section>
          <Container>
            {ACFData && ACFData.hero_content && (
              <div className="hero">
                {/* check for type of hero content */}
                {ACFData.hero_content[0].acf_fc_layout === 'image' ? <HeroImage data={ACFData.hero_content[0]} /> : null}

                {ACFData.hero_content[0].acf_fc_layout === 'html' ? <HeroHTML data={ACFData.hero_content[0]} /> : null}

                {ACFData.hero_content[0].acf_fc_layout === "carousel" ? <HeroCarousel data={ACFData.hero_content[0]} /> : null}
              </div>
            )}

            {/*
              Yeah this isn't very DRY
              I ended up copying and pasting sections because there were too many flex bugs to deal with right now
              If you want to refactor be my guest
            */}

            {/* sidebar right and left */}
            {ACFData && ACFData.sidebar_left && ACFData.sidebar_right && (
              <Row>
                <Column width={[1, 1 / 4]} order={[2, 1]} pr={[0, '2rem']}>
                  <aside dangerouslySetInnerHTML={{ __html: ACFData.sidebar_left }} />
                </Column>

                <Column width={[1, 1 / 2]} order={[1, 2]}>
                  {pageContent && (<Section>
                    <Heading as="h1" underline={true} caps={true}>{pageContent && pageContent.title.rendered}</Heading>
                    <div dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />
                  </Section>)}
                </Column>

                <Column width={[1, 1 / 4]} order={[3, 3]} pl={[0, '2rem']}>
                  <aside dangerouslySetInnerHTML={{ __html: ACFData.sidebar_right }} />
                </Column>
              </Row>
            )}

            {/* sidebar right only */}
            {ACFData && ACFData.sidebar_right && !ACFData.sidebar_left && (
              <Row flexWrap="nowrap">
                <Column width={[1, '75%']}>
                  <Heading as="h1" underline={true} caps={true}>{pageContent && pageContent.title.rendered}</Heading>
                  {pageContent && <section dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />}
                </Column>

                <Column width={[1, '25%']} pl={[0, '2rem']}> <section dangerouslySetInnerHTML={{ __html: ACFData.sidebar_right }} /></Column>
              </Row>
            )}

            {/* sidebar left only */}
            {ACFData && ACFData.sidebar_left && !ACFData.sidebar_right && (
              <Row flexWrap="nowrap">
                <Column width={[1, '25%']} pr={[0, '2rem']}><section dangerouslySetInnerHTML={{ __html: ACFData.sidebar_left }} /></Column>

                <Column width={[1, '75%']}>
                  <Heading as="h1" underline={true} caps={true}>{pageContent && pageContent.title.rendered}</Heading>
                  {pageContent && <section dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />}
                </Column>
              </Row>
            )}

            {/* no sidebars */}
            {ACFData && !ACFData.sidebar_left && !ACFData.sidebar_right && pageContent.content && (
              <Row flexWrap="nowrap">
                <Column>
                  <Heading as="h1" underline={true} caps={true}>{pageContent && pageContent.title.rendered}</Heading>
                  {pageContent && <section dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />}
                </Column>
              </Row>
            )}

          </Container>
        </Section>
        {ACFData && <ACF layouts={ACFData.layouts} />}
      </div>
    )
  }
}
