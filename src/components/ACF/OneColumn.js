import React from 'react';
import Parser from 'html-react-parser';
import { Container, Row, Col } from 'reactstrap';
import styled, { css } from 'styled-components';
import SectionHeading from '../SectionHeading/SectionHeading';

export default (props) => {
  return (
    <Section layout={props.layout}>
      <Container>
        <Row>
          {props.layout.heading && (
            <Col sm={12}>
              <SectionHeading color={props.layout.text_mode === 'light' ? 'white' : 'rgb(26, 82, 118)'}>
                {Parser(props.layout.heading)}
              </SectionHeading>
            </Col>
          )}
          <Col sm={12}>
            {Parser(props.layout.column_1)}
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

const Section = styled.section`
  ${props => props.layout.text_mode === 'light' && css`
    color: white;

    a {
      color: white;
      text-decoration: underline;
    }
  `}

  ${props => props.layout.background === 'Color' && css`
    background-color: ${props.layout.background_color};
  `}

  ${props => props.layout.background === 'Image' && css`
    background-image: url(${props.layout.background_image.url});
    background-repeat: repeat;
    background-position: center center;
  `}

  padding: 2rem 0;
`;