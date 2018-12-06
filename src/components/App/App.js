import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TitleBar from '../TitleBar/TitleBar';
import SecondaryNav from '../SecondaryNav/SecondaryNav';

import WPPage from '../Pages/WPPage';
import HomePage from '../Pages/HomePage';

import './App.css';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <TitleBar />
            <SecondaryNav />
          </header>


          <main>
            <Route path="/" exact component={HomePage} />
            <Route path="/test/:slug" component={WPPage} />
          </main>

          <footer>
            This is the footer.
            <Link to="/test/test-page">WP Test Page</Link>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
