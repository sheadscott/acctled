import React from 'react';
import { Container } from '../Grid/Grid';
import { Section, Heading } from '../Elements/Elements';

const SearchPage = (props) => {
  return (
    <Container>
      <Section>
        <Heading as="h1" caps={true} underline={true}>Search Results</Heading>
        <div>search results...</div>
      </Section>
    </Container>
  )
}

export default SearchPage;