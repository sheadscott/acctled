import React from 'react'
import styled, { css } from 'styled-components';

export default (props) => {
  return (
    <H1 color={props.color} emphasis={props.emphasis}>
      {props.children}
    </H1>
  )
}

const H1 = styled.h1`
  color: rgb(26, 82, 118);
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1.5rem;

  &:after {
    content: '';
    display: block;
    border-bottom: 2px solid rgb(26, 82, 118);
    opacity: 0.35;
  }

  ${props => props.emphasis && css`
    text-shadow: 2px 2px 0 rgba(0,0,0,0.4);
  `}

  ${props => props.color && css`
    color: ${props.color};

    &:after {
      border-bottom: 2px solid ${props.color};
    }
  `}
`;