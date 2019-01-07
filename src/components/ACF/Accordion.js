import React, { Component } from 'react';
import $ from 'jquery';
import 'foundation-sites';
import uuidv1 from 'uuid/v1';


import Parser from 'html-react-parser';
import { Container, Row, Column as Col } from '../Grid/Grid';
import styled from 'styled-components';
import { Section, Heading } from '../Elements/Elements';

export default class AccordionComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      id: null
    }
  }
  componentWillMount() {
    this.setState({ id: uuidv1() });
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
              <Col width={1}>
                <Heading as="h1" caps={true} underline={true} color={this.props.layout.text_mode}>
                  {Parser(this.props.layout.heading)}
                </Heading>
              </Col>
            )}

            <AccordionContent width={1}>
              <ul className="accordion" data-accordion data-multi-expand="true" data-allow-all-closed="true" ref={this.myRef}>
                {this.props.layout.accordion.map((item, index) => (
                  <li key={`${this.state.id}-${index}`} className="accordion-item" data-accordion-item>
                    <a href="#0" className="accordion-title">{Parser(item.title)}</a>
                    <div className="accordion-content" data-tab-content>
                      {Parser(item.description)}
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </Row>
        </Container>
      </Section>
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