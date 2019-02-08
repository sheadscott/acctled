import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fontSize, color, bgColor } from "styled-system";
import decode from "unescape";

const A = props => {
  const url = window.location.pathname;
  const lastSlash = url.lastIndexOf("/");
  const pageName = url.substring(lastSlash);

  if (props.href) {
    return (
      <StyledAnchor href={props.href} {...props}>
        {decode(props.children)}
      </StyledAnchor>
    );
  }

  if ("/" + props.data.object_slug === pageName) {
    return (
      <StyledLink
        to={`/${props.data.object_slug}`}
        className="active"
        {...props}
      >
        {decode(props.children)}
      </StyledLink>
    );
  }

  return (
    <StyledLink to={`/${props.data.object_slug}`} {...props}>
      {decode(props.children)}
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
