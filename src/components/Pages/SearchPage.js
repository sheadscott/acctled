import React, { Component } from 'react';
import axios from "axios";
import styled from 'styled-components';
import Parser from 'html-react-parser';
import { Container } from '../Grid/Grid';
import { A, Section, Heading } from '../Elements/Elements';

class SearchPage extends Component {


  state = {
    query: '',
    searchResults: ''
  }

  getSearchResults() {
    axios.get(`https://www.googleapis.com/customsearch/v1/?q=${this.state.query}&cx=012364290968804032782:hudrbtuxgi8&key=AIzaSyB_RsUE2sfirjPLyMpK8jvYeX45E0tBtvs`)
    .catch(function(error) {
      // handle error
      console.error("*** ERROR *** SearchPage.js: ", error);
    })
    .then(response => {
      if(response) {
        console.log(response.data.items);
        this.setState({
          searchResults: response.data.items
        });
      }
    });
  }
  // This method updates state with the returned object 
  // static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.query!==prevState.query){
  //     return { query: nextProps.query};
  //  }
  //   else return null;
  // }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   const changedProps = nextProps.match.params.query!==prevState.query ?  
  //     { query: nextProps.match.params.query } 
  //     : null;
  //   return changedProps;
  // }

  componentDidUpdate(prevProps, prevState) {
    
    // this.setState({query: this.props.match.params.query}, this.getSearchResults);

    if(prevProps.match.params.query!==this.props.match.params.query){
      this.setState({query: this.props.match.params.query}, this.getSearchResults);
    }
  }

  componentDidMount() {
    this.setState({query: this.props.match.params.query}, this.getSearchResults);
  }

  render() {
  return (
    <Container>
      <Section>
        <Heading as="h1" caps={true} underline={true}>Search Results</Heading>
        { this.state.searchResults && (
          this.state.searchResults.map(result => (
            <SearchResult key={result.cacheId}>
              <Heading as="h2">
                <A href={result.link} hovercolor="purple">{result.title}</A> 
              </Heading>
              { Parser(result.htmlSnippet) }
            </SearchResult>
          )
        )
        )
        }
      </Section>
    </Container>
  )

  }
}

export default SearchPage;

const SearchResult = styled.div`
  padding: 1rem 0;  

  a {
    text-decoration: underline;
  }

  b {
    color: purple;
  }
`;