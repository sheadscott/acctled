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
            <Col>
              <SectionHeading>
                {props.layout.heading}
              </SectionHeading>
            </Col>
          </Row>
        )}
        <Row>
          <Col lg={4}>
            {Parser(props.layout.column_1)}
          </Col>
          <Col lg={4}>
            {Parser(props.layout.column_2)}
          </Col>
          <Col lg={4}>
            {Parser(props.layout.column_3)}
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

const Section = styled.section`
  ${props => props.layout.background === 'Color' && css`
    background-color: ${props.layout.background_color};
  `}

  ${props => props.layout.background === 'Image' && css`
    background-image: url(${props.layout.background_image.url});
    background-repeat: repeat;
    background-position: center center;
  `}

  padding: 2rem 0;

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
  }
`;