import React, { Component } from 'react';
import Axios from 'axios';

import { Container } from 'reactstrap';
import ACF from '../ACF/ACF';
import Section from '../Section/Section';
import SectionHeading from '../SectionHeading/SectionHeading';

// import 'bootstrap/dist/css/bootstrap.css';

export default class WPPage extends Component {
  state = {
    pageContent: null
  }
  componentDidMount() {
    if (this.props.match.params.slug) {
      Axios.get(`https://instruction.austincc.edu/tled/wp-json/wp/v2/pages?slug=${this.props.match.params.slug}`).then(response => {
        console.log('response data', response.data);

        this.setState({
          pageContent: response.data[0]
        })
      });
    }
  }
  render() {
    const slug = this.props.match.params.slug;
    const pageContent = this.state.pageContent;
    const ACFData = pageContent ? this.state.pageContent.acf : null;

    return (
      <div>
        <Section>
          <Container>
            <SectionHeading>{pageContent && pageContent.title.rendered}</SectionHeading>
            <h3>Slug: {slug}</h3>
            {pageContent && <section dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />}
          </Container>
        </Section>
        {ACFData && <ACF layouts={ACFData.layouts} />}
      </div>
    )
  }
}
