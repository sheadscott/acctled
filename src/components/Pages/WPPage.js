import React, { Component } from 'react';
import Axios from 'axios';
import decode from "unescape";
import { Container, Row, Column } from '../Grid/Grid';
import ACF from '../ACF/ACF';
import { A, Img } from '../Elements/Elements';
import styled from 'styled-components';
import { Section, Heading } from 'iw-react-elements';
import Parser from 'html-react-parser';
import domToReact from "html-react-parser/lib/dom-to-react";
// import OldSection from '../Elements/Section';
import MediaContainer from '../MediaContainer/MediaContainer';
import { Redirect } from 'react-router';
import Hero from '../ACF/Hero';
// import { relative } from 'upath';
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

const HeroHTML = ({ data }) => {
  console.log('hero data', data, data.html_content, data.background_image.sizes);
  return (
    <div className="container" style={{
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center'
    }}>

      <HTMLContentBox>{Parser(data.html_content)}</HTMLContentBox>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <MediaContainer ratio="100%">
          {mediaLoaded => <Img src={data.background_image.url} sizes={data.background_image.sizes} alt={data.background_image.alt} onLoad={mediaLoaded} />}
        </MediaContainer>
      </div>
    </div>
  );
}

const HTMLContentBox = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 1.5rem;
`;

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
    pageContent: 'some value'
  }

  getData(slug) {
    console.log('component received new props', slug);

    Axios.get(`https://instruction.austincc.edu/tled/wp-json/wp/v2/pages?slug=${slug}`)
      .catch(function (error) {
        // handle error
        console.error("*** ERROR *** WPPage.js: ", error);
      })
      .then(response => {
        console.log("Response: ", response);
        const html = response.data[0];
        this.setState({
          pageContent: html,
          slug: slug
        })
      });
  }

  componentDidMount() {
    if (this.props.match.params.slug) {
      this.getData(this.props.match.params.slug);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextSlug = nextProps.match.params.slug;
    return nextSlug !== prevState.slug ? { slug: nextSlug } : null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.slug !== this.state.slug) {
      this.getData(this.state.slug);
    }
  }

  render() {
    const pageContent = this.state.pageContent;

    const ACFData = pageContent ? this.state.pageContent.acf : null;

    const parseContent = (content) => {
      return Parser(content, {
        replace: function ({ name, attribs, children }) {
          if (name === "a") {
            const url = attribs.href.replace("https://instruction.austincc.edu/tled", "");
            return (
              <A href={url}>{domToReact(children)}</A>
            );
          }
        }
      })
    };

    if (!pageContent) {
      return <Redirect to='/404' />
    }

    return (
      <React.Fragment>
        <Container>
          {ACFData && ACFData.hero_content && (
            <div className="hero" style={{ marginTop: '1.5rem' }}>
              {ACFData.hero_content[0].acf_fc_layout && <Hero data={ACFData.hero_content[0]} />}
            </div>
          )}

          {/*
              Yeah this isn't very DRY
              I ended up copying and pasting sections because there were too many flex bugs to deal with right now
              If you want to refactor be my guest
            */}

          {/* sidebar right and left */}
          {ACFData && ACFData.sidebar_left && ACFData.sidebar_right && (
            <Section>
              <Row>
                <Column width={[1, 1 / 4]} order={[2, 1]} pr={[0, '2rem']}>
                  <Aside>
                    {parseContent(ACFData.sidebar_left)}
                  </Aside>
                </Column>

                <Column width={[1, 1 / 2]} order={[1, 2]}>
                  {pageContent && (<Section>
                    <Heading as="h1" underline={true} caps={true}>{decode(pageContent.title.rendered)}</Heading>
                    <div>
                      {parseContent(pageContent.content.rendered)}
                    </div>
                  </Section>)}
                </Column>

                <Column width={[1, 1 / 4]} order={[3, 3]} pl={[0, '2rem']}>
                  <Aside>
                    {parseContent(ACFData.sidebar_right)}
                  </Aside>
                </Column>
              </Row>
            </Section>
          )}

          {/* sidebar right only */}
          {ACFData && ACFData.sidebar_right && !ACFData.sidebar_left && (
            <Section>
              <Row>
                <Column width={[1, 3 / 4]}>
                  <Heading as="h1" underline={true} caps={true}>{decode(pageContent.title.rendered)}</Heading>
                  {pageContent && (
                    <section>
                      {parseContent(pageContent.content.rendered)}
                    </section>
                  )}

                </Column>

                <Column width={[1, 1 / 4]} pl={[0, '2rem']}>
                  <Aside>
                    {parseContent(ACFData.sidebar_right)}
                  </Aside>
                </Column>
              </Row>
            </Section>
          )}

          {/* sidebar left only */}
          {ACFData && ACFData.sidebar_left && !ACFData.sidebar_right && (
            <Section>
              <Row>
                <Column width={[1, 1 / 4]} pr={[0, '2rem']} order={[2, 1]}>
                  <Aside>
                    {parseContent(ACFData.sidebar_left)}
                  </Aside>
                </Column>

                <Column width={[1, 3 / 4]} order={[1, 2]}>
                  <Heading as="h1" underline={true} caps={true}>{decode(pageContent.title.rendered)}</Heading>
                  {pageContent && (
                    <section>
                      {parseContent(pageContent.content.rendered)}
                    </section>
                  )}
                </Column>
              </Row>
            </Section>
          )}

          {/* no sidebars */}
          {ACFData && !ACFData.sidebar_left && !ACFData.sidebar_right && pageContent.content.rendered && (
            <Section>
              <Row flexWrap="nowrap">
                <Column width={1}>
                  <Heading as="h1" underline={true} caps={true}>{decode(pageContent.title.rendered)}</Heading>
                  {pageContent && parseContent(pageContent.content.rendered)}

                </Column>
              </Row>
            </Section>
          )}

        </Container>

        {ACFData && <ACF layouts={ACFData.layouts} />}
      </React.Fragment>
    )
  }
}

const Aside = styled.aside`
  margin-top: 2rem;
`;
