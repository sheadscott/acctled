import React from 'react';
import HTMLParser from 'html-react-parser';
import domToReact from "html-react-parser/lib/dom-to-react";
import MediaContainer from '../MediaContainer/MediaContainer';
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

      if (name === 'iframe') {
        attribs.style = { border: 'none' };

        if (attribs.hasOwnProperty('allowfullscreen')) {
          attribs.allowFullScreen = attribs.allowfullscreen;
          delete attribs.allowfullscreen;
        }

        if (attribs.hasOwnProperty('frameborder')) {
          attribs.frameBorder = attribs.frameborder;
          delete attribs.frameborder;
        }
        return (<MediaContainer ratio="53%">{mediaLoaded => <iframe title="iframe content" onLoad={mediaLoaded} {...attribs} />}</MediaContainer>);
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