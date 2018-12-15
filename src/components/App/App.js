import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import Search from '../Search/Search';
import TitleBar from "../TitleBar/TitleBar";
import SecondaryNav from "../SecondaryNav/SecondaryNav";
import Footer from "../Footer/Footer";

import WPPage from '../Pages/WPPage';
import HomePage from '../Pages/HomePage';
import CalendarPage from '../Pages/CalendarPage';

import './App.css';
class App extends Component {
  state = {
    searchExpanded: false
  }
  s
  toggleSearch = (event) => {
    this.setState(prevState => {
      return {
        searchExpanded: !prevState.searchExpanded
      }
    });

    if (event) {
      event.preventDefault();
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header className="App-header">
            <Search searchExpanded={this.state.searchExpanded} />
            <TitleBar searchExpanded={this.state.searchExpanded} toggleSearch={this.toggleSearch} />
            <SecondaryNav />
          </Header>

          <Main>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/calendar" component={CalendarPage} />
              <Route path="/:slug" component={WPPage} />
            </Switch>
          </Main>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

const Header = styled.header`
  position: relative;
  z-index: 999;
`;

const Main = styled.main`
  position: relative;
  z-index: 800;
  background: white;
  width: 100%;
  box-sizing: border-box;
`;