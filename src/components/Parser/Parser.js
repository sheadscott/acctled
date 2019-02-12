import React from 'react';
import HTMLParser from 'html-react-parser';
import domToReact from "html-react-parser/lib/dom-to-react";
import { A } from '../Elements/Elements';

const parseContent = content => {
  return HTMLParser(content, {
    replace: function ({ name, attribs, children }) {
      if (name === "a" && attribs.href) {
        console.log(attribs.href);
        const url = attribs.href.match(/\/uploads\//) ?
          attribs.href :
          attribs.href.replace("https://instruction.austincc.edu/tled", "");
        return (
          <A href={url} className={attribs.class}>{domToReact(children)}</A>
        );
      }
    }
  })
};

const Parser = props => {
  return (
    <React.Fragment>
      {parseContent(props.children)}  
    </React.Fragment>
  );
};

export default Parser;