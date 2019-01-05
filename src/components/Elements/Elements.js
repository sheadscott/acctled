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


function printHeadingColor(color) {
  if (color) {
    if (color === 'light') {
      return css`color: white;`;
    }

    return css`color: ${color}`;
  }

  return css`color: rgb(26, 82, 118);`
}

function printUnderline(color, underline) {
  if (underline) {
    return css`
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: ${color || 'rgb(26, 82, 118)'};`;
  }

  return null;
}


// underline => boolean
// emphasis => boolean
// caps => boolean
const Heading = styled(Box)`
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  &:after {
    content: '';
    display: block;
    opacity: 0.35;
    ${props => printUnderline(props.color, props.underline)};
  }

  ${props => printHeadingColor(props.color)};

  ${props => props.caps && css`
    text-transform: uppercase;
  `}

  // emphasis prop turns on text shadow
  ${props => props.emphasis && css`
    text-shadow: 2px 2px 0 rgba(0,0,0,0.4);
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