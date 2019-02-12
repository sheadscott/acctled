import React, { Component } from 'react';
import Axios from 'axios';
import decode from "unescape";
import styled from 'styled-components';
import { Section, Heading } from 'iw-react-elements';
import { Redirect } from 'react-router';

import { Container, Row, Column } from '../Grid/Grid';
import ACF from '../ACF/ACF';
import Hero from '../ACF/Hero';
import Parser from '../Parser/Parser';

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
  
  getSlug = params => {
      return params.param5 || params.param4 || params.param3 || params.param2 || params.param1;
  }

  componentDidMount() {
    
    this.getData(this.getSlug(this.props.match.params));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const getSlug = params => {
        return params.param5 || params.param4 || params.param3 || params.param2 || params.param1;
    }
    const nextSlug = getSlug(nextProps.match.params);
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
                    <Parser>{ACFData.sidebar_left}</Parser>
                  </Aside>
                </Column>

                <Column width={[1, 1 / 2]} order={[1, 2]}>
                  {pageContent && (<Section>
                    <Heading as="h1" underline={true} caps={true}>{decode(pageContent.title.rendered)}</Heading>
                    <div>
                    <Parser>{pageContent.content.rendered}</Parser>
                    </div>
                  </Section>)}
                </Column>

                <Column width={[1, 1 / 4]} order={[3, 3]} pl={[0, '2rem']}>
                  <Aside>
                    <Parser>{ACFData.sidebar_right}</Parser>
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
                      <Parser>{pageContent.content.rendered}</Parser>
                    </section>
                  )}

                </Column>

                <Column width={[1, 1 / 4]} pl={[0, '2rem']}>
                  <Aside>
                    <Parser>{ACFData.sidebar_right}</Parser>
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
                    <Parser>{ACFData.sidebar_left}</Parser>
                  </Aside>
                </Column>

                <Column width={[1, 3 / 4]} order={[1, 2]}>
                  <Heading as="h1" underline={true} caps={true}>{decode(pageContent.title.rendered)}</Heading>
                  {pageContent && (
                    <section>
                      <Parser>{pageContent.content.rendered}</Parser>
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
                  {pageContent && <Parser>{pageContent.content.rendered}</Parser>}
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
