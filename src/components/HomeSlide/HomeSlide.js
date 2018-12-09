import React from 'react'
import { Container } from '../Grid/Grid';
import styled from 'styled-components';
/*
  Home page hero slider
*/

export default function HomeSlide() {
  return (
    <Wrapper>
      <Container>
        <h1>Home Page Slider Component</h1>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 4rem 0;
  background: #ccc;
`;