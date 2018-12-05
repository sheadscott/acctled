import React, { Component } from 'react';
import Axios from 'axios';

export default class Page extends Component {
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
    const pageContent = this.state.pageContent
    return (
      <div style={{ padding: '3rem' }}>
        <h1>This is a page component</h1>
        {this.props.match.params.slug && (<div>
          <h2>{pageContent && pageContent.title.rendered}</h2>
          Slug: {this.props.match.params.slug}
        </div>)}
      </div>
    )
  }
}
