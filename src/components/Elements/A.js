import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fontSize, color, bgColor } from 'styled-system';

const A = props => {
  const url = window.location.pathname;
  const lastSlash = url.lastIndexOf('/');
  const pageName = url.substring(lastSlash);
  const object_slug = props.data ? props.data.object_slug : '';

  if (props.href) {
    return (
      <StyledAnchor href={props.href} {...props}>
        {props.children}
      </StyledAnchor>
    );
  }

  if ('/' + object_slug === pageName) {
    return (
      <StyledLink
        to={`/${object_slug}`}
        className="active object_slug"
        {...props}
      >
        {props.children}
      </StyledLink>
    );
  }

  return (
    <StyledLink to={`/${object_slug}`} className="object_slug" {...props}>
      {props.children}
    </StyledLink>
  );
};

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
