import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import logo from '../../img/logo.svg';
import './App.css';
import TitleBar from '../TitleBar/TitleBar';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

import Page from '../Page/Page';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <TitleBar />
            <SecondaryNav />
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
          </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
          </a>
          </header>


          <Route path="/" exact component={Page} />
          <Route path="/test/:slug" component={Page} />
        </div>
      </Router>
    );
  }
}

export default App;
