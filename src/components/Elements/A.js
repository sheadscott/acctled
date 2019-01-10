import React from 'react';
import { Link } from "react-router-dom";

const A = (props) => {
  if (props.href) { return <a href={props.href}>{props.children}</a> };

  return (
    <Link to={`/${props.data.object_slug}`}>{props.children}</Link>
  )
}

export default A;