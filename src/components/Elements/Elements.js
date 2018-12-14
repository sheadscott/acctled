
import React from 'react';
import { Link } from "react-router-dom";
import { Box } from '@rebass/grid';
import styled from 'styled-components';


const A = (props) => {
  if (props.href) { return <a href={props.href}>{props.children}</a> };

  return (
    <Link to={`/${props.data.object_slug}`}>{props.children}</Link>
  )
}

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

export { A, HR }