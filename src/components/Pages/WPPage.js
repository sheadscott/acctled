import React, { Component } from 'react';
import Axios from 'axios';

import { Container } from '../Grid/Grid';
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
            <SectionHeading>{pageContent && pageContent.title.rendered}</SectionHeading>
            {pageContent && <section dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />}
          </Container>
        </Section>
        {ACFData && <ACF layouts={ACFData.layouts} />}
      </div>
    )
  }
}
