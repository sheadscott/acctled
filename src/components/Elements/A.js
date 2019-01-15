import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { fontSize, color, bgColor } from 'styled-system';

const A = (props) => {
  if (props.href) { return <StyledAnchor href={props.href} {...props}>{props.children}</StyledAnchor> };

  return (
    <StyledLink to={`/${props.data.object_slug}`} {...props}>{props.children}</StyledLink>
  )
}

export default A;

const StyledAnchor = styled.a`
  ${fontSize}
  ${color}
  ${bgColor}

  &:hover,
  &:focus {
    color: ${props => props.hovercolor};
  }
`;

const StyledLink = styled(Link)`
  ${fontSize}
  ${color}
  ${bgColor}

  &:hover,
  &:focus {
    color: ${props => props.hoverColor};
  }
`;