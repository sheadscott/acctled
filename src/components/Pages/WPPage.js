import React, { Component } from 'react';
import Axios from 'axios';
import decode from 'unescape';
import styled from 'styled-components';
import { Section, Heading } from 'iw-react-elements';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';

import { Container, Row, Column } from '../Grid/Grid';
import ACF from '../ACF/ACF';
import Hero from '../ACF/Hero';
import Parser from '../Parser/Parser';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { replaceUrl } from '../../helpers';

export default class WPPage extends Component {
  state = {
    slug: '',
    pageContent: 'some value',
    pageTitle: 'TLED Site'
  };

  getData(slug) {
    console.log('component received new props', slug);

    console.log('Param1: ', this.props.match.params.param1);

    const site = this.props.match.params.param1 === 'ocei' ? 'ocei' : 'tled';

    Axios.get(
      `https://instruction.austincc.edu/${site}/wp-json/wp/v2/pages?slug=${slug}`
    )
      .catch(function(error) {
        // handle error
        console.error('*** ERROR *** WPPage.js: ', error);
      })
      .then(response => {
        console.log('Response: ', response);
        const html = response.data[0];
        let pageTitle = '';
        try {
          pageTitle = html.title.rendered;
        } catch (e) {
          console.log(e);
        }
        this.setState({
          pageContent: html,
          slug: slug,
          pageTitle: pageTitle
        });

        if (html) {
          Axios.get(
            `https://instruction.austincc.edu/${site}/wp-json/bcn/v1/post/${
              html.id
            }`
          )
            .catch(function(error) {
              console.error('breadcrumb error', error);
            })
            .then(response => {
              console.log('breadcrumb data', response.data.itemListElement);
              // console.log('breadcrumb data', response.data.itemListElement.slice(1));
              let breadcrumbData;

              if (site === 'tled') {
                breadcrumbData = response.data.itemListElement.slice(1);
                breadcrumbData[0].item.name = 'Home';
                breadcrumbData[0].item['@id'] = '/';
              }

              if (site === 'ocei') {
                breadcrumbData = response.data.itemListElement;
                breadcrumbData[0].item.name = 'Home';
                breadcrumbData[0].item['@id'] = '/';
                breadcrumbData[1].item.name = 'OCEI';
                breadcrumbData[1].item['@id'] = '/ocei';
              }

              const cleanedCrumbUrls = breadcrumbData.map(crumb => {
                crumb.item['@id'] = replaceUrl(crumb.item['@id']);
                crumb.item.name = decode(crumb.item.name);
                return crumb;
              });

              this.setState({
                breadcrumbs: cleanedCrumbUrls
              });
            });
        }
      });
  }

  getSlug = params => {
    return (
      params.param5 ||
      params.param4 ||
      params.param3 ||
      params.param2 ||
      params.param1
    );
  };

  componentDidMount() {
    this.getData(this.getSlug(this.props.match.params));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const getSlug = params => {
      return (
        params.param5 ||
        params.param4 ||
        params.param3 ||
        params.param2 ||
        params.param1
      );
    };
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
    const pageTitle = this.state.pageTitle;
    const ACFData = pageContent ? this.state.pageContent.acf : null;

    if (!pageContent) {
      return <Redirect to="/404" />;
    }

    return (
      <React.Fragment>
        <Container>
          <Helmet>
            <title>{decode(pageTitle)}</title>
          </Helmet>
          {ACFData && ACFData.hero_content && (
            <div className="hero" style={{ marginTop: '1.5rem' }}>
              {ACFData.hero_content[0].acf_fc_layout && (
                <Hero data={ACFData.hero_content[0]} />
              )}
            </div>
          )}

          <Breadcrumbs data={this.state.breadcrumbs} />

          {/*
              Yeah this isn't very DRY
              I ended up copying and pasting sections because there were too many flex bugs to deal with right now
              If you want to refactor be my guest
            */}

          {/* sidebar right and left */}
          {ACFData && pageContent.template === 'page-sidebar-left-right.php' && (
            <Section>
              <Row>
                <Column
                  width={[1, 1 / 4]}
                  order={[2, 1]}
                  pr={[0, '2rem']}
                  className="leftSidebar"
                >
                  <Aside
                    backgroundColor={
                      ACFData.sidebar_left_background &&
                      ACFData.sidebar_left_background.background_a === 'Color'
                        ? ACFData.sidebar_left_background.background_color_a
                        : null
                    }
                  >
                    <Parser>{ACFData.sidebar_left}</Parser>
                  </Aside>
                </Column>

                <Column width={[1, 1 / 2]} order={[1, 2]}>
                  {pageContent && (
                    <Section>
                      <Heading as="h1" underline={true} caps={true}>
                        {decode(pageContent.title.rendered)}
                      </Heading>
                      <div>
                        <Parser>{pageContent.content.rendered}</Parser>
                      </div>
                    </Section>
                  )}
                </Column>

                <Column
                  width={[1, 1 / 4]}
                  order={[3, 3]}
                  pl={[0, '2rem']}
                  className="rightSidebar"
                >
                  <Aside
                    backgroundColor={
                      ACFData.sidebar_right_background &&
                      ACFData.sidebar_right_background.background_b === 'Color'
                        ? ACFData.sidebar_right_background.background_color_b
                        : null
                    }
                  >
                    <Parser>{ACFData.sidebar_right}</Parser>
                  </Aside>
                </Column>
              </Row>
            </Section>
          )}

          {/* sidebar right only */}
          {ACFData && pageContent.template === 'page-sidebar-right.php' && (
            <Section>
              <Row>
                <Column width={[1, 3 / 4]}>
                  <Heading as="h1" underline={true} caps={true}>
                    {decode(pageContent.title.rendered)}
                  </Heading>
                  {pageContent && (
                    <section>
                      <Parser>{pageContent.content.rendered}</Parser>
                    </section>
                  )}
                </Column>

                <Column width={[1, 1 / 4]} pl={[0, '2rem']}>
                  <Aside
                    backgroundColor={
                      ACFData.sidebar_right_background &&
                      ACFData.sidebar_right_background.background_b === 'Color'
                        ? ACFData.sidebar_right_background.background_color_b
                        : null
                    }
                  >
                    <Parser>{ACFData.sidebar_right}</Parser>
                  </Aside>
                </Column>
              </Row>
            </Section>
          )}

          {/* sidebar left only */}
          {ACFData && pageContent.template === 'page-sidebar-left.php' && (
            <Section>
              <Row>
                <Column width={[1, 1 / 4]} pr={[0, '2rem']} order={[2, 1]}>
                  <Aside
                    backgroundColor={
                      ACFData.sidebar_left_background &&
                      ACFData.sidebar_left_background.background_a === 'Color'
                        ? ACFData.sidebar_left_background.background_color_a
                        : null
                    }
                  >
                    <Parser>{ACFData.sidebar_left}</Parser>
                  </Aside>
                </Column>

                <Column width={[1, 3 / 4]} order={[1, 2]}>
                  <Heading as="h1" underline={true} caps={true}>
                    {decode(pageContent.title.rendered)}
                  </Heading>
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
          {pageContent.template === '' && pageContent.content.rendered && (
            <Section>
              <Row flexWrap="nowrap">
                <Column width={1}>
                  <Heading as="h1" underline={true} caps={true}>
                    {decode(pageContent.title.rendered)}
                  </Heading>
                  {pageContent && (
                    <Parser>{pageContent.content.rendered}</Parser>
                  )}
                </Column>
              </Row>
            </Section>
          )}
        </Container>

        {ACFData && <ACF layouts={ACFData.layouts} />}
      </React.Fragment>
    );
  }
}

const Aside = styled.aside`
  margin-top: 2rem;
  ${props =>
    props.backgroundColor &&
    `
      background-color: ${props.backgroundColor};
      padding: 1rem;
      height: calc(100% - 2rem);
    `}
`;
