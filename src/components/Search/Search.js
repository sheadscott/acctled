import React, { Component } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { Container, Row, Column } from '../Grid/Grid';

/*
  based on https://www.mtu.edu/
*/

export default class Search extends Component {
  state = {
    redirect: '',
  }

  fieldFocus = '';

  componentDidUpdate(prevProps) {
    console.log('search expanded', prevProps.searchExpanded, this.props.searchExpanded);

    if (this.props.searchExpanded) {
      this.searchTLEDField.focus();
    }
  }

  handleSubmit = (event) => {
    this.props.searchSubmitted();

    if (this.fieldFocus === 'tled') {
      console.log('search tled', this.searchTLEDField.value);
      this.setState({ redirect: `/search?q=${this.searchTLEDField.value}` });
    }

    if (this.fieldFocus === 'acc') {
      console.log('search acc', this.searchACCField.value);
      this.setState({ redirect: `http://www.austincc.edu/search?search=${this.searchACCField.value}` });
      // window.location.replace('http://www.austincc.edu/search');
    }

    /* http://www.austincc.edu/search?search=education */
    event.preventDefault();
    return false;
  }

  setFocus = (label) => {
    this.fieldFocus = label;
  }

  render() {
    if (this.fieldFocus === 'acc') {
      window.location = this.state.redirect
      console.log('the acc redirect should be happening now');
    }

    if (this.fieldFocus === 'tled' && window.location.pathname !== '/search') {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <Wrapper {...this.props}>
        <Container>
          <Form id="searchForm" onSubmit={(e) => this.handleSubmit(e)}>
            <Row style={{ width: '100%' }}>
              <Column width={[1, 1 / 2]} pr={[0, '1rem']}>
                <fieldset>
                  <legend>Search TLED</legend>
                  <label htmlFor="searchTLEDField" className="show-for-sr">TLED</label>
                  <div className="input-group">
                    <input id="searchTLEDField" className="input-group-field" onFocus={() => this.setFocus('tled')} ref={el => this.searchTLEDField = el} />
                    <div className="input-group-button">
                      <button type="submit" className="button">Search TLED</button>
                    </div>
                  </div>
                </fieldset>
              </Column>

              <Column width={[1, 1 / 2]} pl={[0, '1rem']}>
                <fieldset>
                  <legend>Search ACC</legend>
                  <label htmlFor="searchACCField" className="show-for-sr">ACC</label>
                  <div className="input-group">
                    <input id="searchACCField" className="input-group-field" onFocus={() => this.setFocus('acc')} ref={el => this.searchACCField = el} />
                    <div className="input-group-button">
                      <button type="submit" className="button">Search ACC</button>
                    </div>
                  </div>
                </fieldset>
              </Column>
            </Row>
          </Form>
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
  height: ${props => props.searchExpanded ? '180px' : '0px'}

  @media (min-width: 640px) {
    height: ${props => props.searchExpanded ? '120px' : '0px'}
  }
`;

const Form = styled.form`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  color: white;

  &:focus button {
    background: red;
  }

  button {
    padding: 10px;
  }
`;
