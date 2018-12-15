import React, { Component } from 'react';
import $ from 'jquery';

import Parser from 'html-react-parser';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import Section from '../Section/Section';
import SectionHeading from '../SectionHeading/SectionHeading';

import './Accordion.scss';

export default class AccordionComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    // const $dropdown = new Accordion('.accordion');
    $(this.myRef.current).foundation();
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <Section>
        <Container>
          <Row>
            {this.props.layout.heading && (
              <Col sm={12}>
                <SectionHeading color={this.props.layout.text_mode === 'light' ? 'white' : 'rgb(26, 82, 118)'}>
                  {Parser(this.props.layout.heading)}
                </SectionHeading>
              </Col>
            )}
            <AccordionContent>
              <ul className="accordion" data-accordion ref={this.myRef}>
                {this.props.layout.accordion.map(item => (
                  <li className="accordion-item" data-accordion-item>
                    <a href="#" className="accordion-title">{Parser(item.title)}</a>
                    <div className="accordion-content" data-tab-content>
                      {Parser(item.description)}
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </Row>
        </Container>
      </Section >
    )
  }
}

const AccordionContent = styled(Col)`
.accordion {
  padding: 0;
  margin: 0;
  
  .accordion-title {
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #e6e6e6;

    &:before {
      font-size: 1.3rem;
      font-weight: 700;
      margin-top: -0.55rem;
    }
  }
  .accordion-content {
    border: none;
  }
}
`;