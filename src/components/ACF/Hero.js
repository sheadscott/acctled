import React from 'react';
import styled from 'styled-components';
import MediaContainer from '../MediaContainer/MediaContainer';
import Parser from 'html-react-parser';
import domToReact from "html-react-parser/lib/dom-to-react";
import { Img } from '../Elements/Elements';

export default function Hero(props) {
  console.log(props.data.acf_fc_layout);
  const layout = props.data.acf_fc_layout;

  if (layout === 'html') {
    return (
      <div className="container" style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
      }}>

        <HTMLContentBox>{Parser(props.data.html_content, {
          replace: function (data) {
            console.log('element', data.name, data);
            return data.name === 'iframe' ? (<MediaContainer ratio="30%">{mediaLoaded => <iframe title="iframe content" onLoad={mediaLoaded} {...data.attribs} />}</MediaContainer>) : null;
          }
        })}</HTMLContentBox>
        {props.data.background_image && (
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MediaContainer ratio="100%">
              {mediaLoaded => <Img src={props.data.background_image.url} sizes={props.data.background_image.sizes} alt={props.data.background_image.alt} onLoad={mediaLoaded} />}
            </MediaContainer>
          </div>
        )}
      </div>)
  }

  if (layout === 'image') {
    if (props.data.image_description) {
      return (
        <div className="container">
          <figure className="hero-content" style={{ margin: 0 }}>
            <MediaContainer>
              {mediaLoaded => <Img src={props.data.image_content.url} sizes={props.data.image_content.sizes} alt={props.data.image_content.alt} onLoad={mediaLoaded} />}
            </MediaContainer>
            <figcaption style={{ textAlign: 'right', opacity: 0.5, fontStyle: 'italic' }}>
              {props.data.image_description}
            </figcaption>
          </figure>
        </div>
      )
    }

    return (
      <div className="container">
        <div className="hero-content">
          <MediaContainer>
            {mediaLoaded => <Img src={props.data.image_content.url} sizes={props.data.image_content.sizes} alt={props.data.image_content.alt} onLoad={mediaLoaded} />}
          </MediaContainer>
        </div>
      </div>
    )
  }

  return null;
}

const HTMLContentBox = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  background: transparent;
`;