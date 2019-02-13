import React, { Component } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { Container, Row, Column } from '../Grid/Grid';

/*
  based on https://www.mtu.edu/
*/

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.searchTLEDField = React.createRef();
    this.searchACCField = React.createRef();
  }

  state = {
    redirect: '',
  }

  fieldFocus = '';

  componentDidUpdate() {
    if (this.props.searchExpanded && this.searchTLEDField.current) {
      this.searchTLEDField.current.focus();
    } else {
      // set this.fieldFocus to '' so that a redirect
      // won't be triggered in render() after a search has been performed
      this.fieldFocus = '';
    }
  }

  handleSubmit = (event) => {
    this.props.searchSubmitted();

    if (this.fieldFocus === 'tled') {
      this.setState({ redirect: `/search/${this.searchTLEDField.current.value}` });
    }

    if (this.fieldFocus === 'acc') {
      this.setState({ redirect: `http://www.austincc.edu/search?search=${this.searchACCField.current.value}` });
    }

    /* http://www.austincc.edu/search?search=education */
    event.preventDefault();
    return false;
  }

  setFocus = (label) => {
    this.fieldFocus = label;
  }

  render() {
    if (
      this.fieldFocus === 'acc'
      && this.state.redirect
    ) {
      window.location = this.state.redirect
    }

    if (
      this.fieldFocus === 'tled'
      && this.state.redirect
      && this.state.redirect !== '/search/'
      && this.state.redirect !== window.location.pathname
    ) {
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
                    <input id="searchTLEDField" className="input-group-field" onFocus={() => this.setFocus('tled')} ref={this.searchTLEDField} />
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
                    <input id="searchACCField" className="input-group-field" onFocus={() => this.setFocus('acc')} ref={this.searchACCField} />
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

  input {
    padding-left: 0.5rem;
    @media (max-width: 400px) {
      width:25%;
    }
  }
  &:focus button {
    background: red;
  }

  button {
    padding: 10px;
  }
`;
