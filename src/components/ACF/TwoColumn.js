import React from 'react';
import Parser from 'html-react-parser';
import { Container, Row, Col } from 'reactstrap';
import styled, { css } from 'styled-components';
import SectionHeading from '../SectionHeading/SectionHeading';

export default (props) => {
  return (
    <Section layout={props.layout}>
      <Container>
        {props.layout.heading && (
          <Row>
            <Col sm={12}>
              <SectionHeading>
                {Parser(props.layout.heading)}
              </SectionHeading>
            </Col>
          </Row>
        )}
        <Row>
          <Col med={6} sm={12} lg={6}>
            {Parser(props.layout.column_1)}
          </Col>
          <Col med={6} sm={12} lg={6}>
            {Parser(props.layout.column_2)}
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

const Section = styled.section`
  h1 {
    color: rgb(26, 82, 118);
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 1.5rem;

    &:after {
      content: '';
      display: block;
      border-bottom: 2px solid rgb(26, 82, 118);
      opacity: 0.35;
    }
  }

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