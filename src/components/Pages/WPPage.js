import React, { Component } from 'react';
import Axios from 'axios';

import { Container, Row, Column } from '../Grid/Grid';
import ACF from '../ACF/ACF';
import Section from '../Section/Section';
import SectionHeading from '../SectionHeading/SectionHeading';

// import 'bootstrap/dist/css/bootstrap.css';

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

            {/*
              Yeah this isn't very DRY
              I ended up copying and pasting sections because there were too many flex bugs to deal with right now
              If you want to refactor be my guest
            */}

            {/* sidebar right and left */}
            {ACFData && ACFData.sidebar_left && ACFData.sidebar_right && (
              <Row flexWrap="nowrap">
                <Column width={[1, '25%']}><section dangerouslySetInnerHTML={{ __html: ACFData.sidebar_left }} /></Column>

                <Column flex="1 1 auto" width="auto">
                  <SectionHeading>{pageContent && pageContent.title.rendered}</SectionHeading>
                  {pageContent && <section dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />}
                </Column>

                <Column width={[1, '25%']} > <section dangerouslySetInnerHTML={{ __html: ACFData.sidebar_right }} /></Column>
              </Row>
            )}

            {/* sidebar right only */}
            {ACFData && ACFData.sidebar_right && !ACFData.sidebar_left && (
              <Row flexWrap="nowrap">
                <Column width={[1, '75%']}>
                  <SectionHeading>{pageContent && pageContent.title.rendered}</SectionHeading>
                  {pageContent && <section dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />}
                </Column>

                <Column width={[1, '25%']} > <section dangerouslySetInnerHTML={{ __html: ACFData.sidebar_right }} /></Column>
              </Row>
            )}

            {/* sidebar left only */}
            {ACFData && ACFData.sidebar_left && !ACFData.sidebar_right && (
              <Row flexWrap="nowrap">
                <Column width={[1, '25%']}><section dangerouslySetInnerHTML={{ __html: ACFData.sidebar_left }} /></Column>

                <Column width={[1, '75%']}>
                  <SectionHeading>{pageContent && pageContent.title.rendered}</SectionHeading>
                  {pageContent && <section dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />}
                </Column>
              </Row>
            )}

            {/* no sidebars */}
            {ACFData && !ACFData.sidebar_left && !ACFData.sidebar_right && (
              <Row flexWrap="nowrap">
                <Column>
                  <SectionHeading>{pageContent && pageContent.title.rendered}</SectionHeading>
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
