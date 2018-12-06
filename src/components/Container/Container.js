import React from 'react';
import styled from 'styled-components';

export default function Container(props) {
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 60em;
  padding: 0 2rem;
`

