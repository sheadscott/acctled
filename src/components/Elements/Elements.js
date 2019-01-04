import React from 'react';
import { Link } from "react-router-dom";
import { Box } from '@rebass/grid';
import styled, { css } from 'styled-components';
import Img from './Img';


const A = (props) => {
  if (props.href) { return <a href={props.href}>{props.children}</a> };

  return (
    <Link to={`/${props.data.object_slug}`}>{props.children}</Link>
  )
}

// color => color
// underline => boolean
// emphasis => boolean
// size => font-size
// caps => boolean
const Heading = styled(Box)`
  color: rgb(26, 82, 118);
  font-weight: 700;
  margin-bottom: 1.5rem;

  &:after {
    content: '';
    display: block;
    opacity: 0.35;
  }

  ${props => props.caps && css`
    text-transform: uppercase;
  `}

  // emphasis prop turns on text shadow
  ${props => props.emphasis && css`
    text-shadow: 2px 2px 0 rgba(0,0,0,0.4);
  `}

  ${props => props.color && css`
    color: ${props.color};
  `}

  ${props => props.color && props.underline && css`
    &:after {
      border-bottom: 2px solid ${props.color || 'rgb(26, 82, 118)'};
    }
  `}
`;

const HR = styled(Box)`
  display: block;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom-color: ${props => props.color};
  border-bottom-style: ${props => props.borderStyle};
  border-bottom-width: ${props => props.borderWidth};
  opacity: ${props => props.opacity}
`;

HR.defaultProps = {
  color: 'rgb(26,82,118)',
  borderStyle: 'solid',
  borderWidth: '2px',
  opacity: 0.35,
  as: 'hr'
}

export { A, HR, Heading, Img }