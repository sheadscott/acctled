import React, { Component } from 'react'
import styled from 'styled-components';
import { Container, Row, Column } from '../Grid/Grid';

/*
  based on https://www.mtu.edu/
*/

export default class Search extends Component {
  componentDidUpdate(prevProps) {
    console.log('search expanded', prevProps.searchExpanded, this.props.searchExpanded);
    if (this.props.searchExpanded) {
      this.searchField.focus();
    }
  }
  render() {
    return (
      <Wrapper {...this.props}>
        <Container>
          <Row>
            <Column>
              <Form id="searchForm" action="#">
                <input ref={el => this.searchField = el} />
                <button>Search TLED</button>
              </Form>
            </Column>
          </Row>
        </Container>
      </Wrapper>
    )
  }
}


const Wrapper = styled.div`
  background: black;
  overflow: hidden;
  // height: 60px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: height 0.2s linear;
  height: ${props => props.searchExpanded ? '60px' : '0px'}
`;

const Form = styled.form`
  padding: 1rem 0;
`;

