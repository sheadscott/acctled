import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import TitleBar from "../TitleBar/TitleBar";
import SecondaryNav from "../SecondaryNav/SecondaryNav";
import Footer from "../Footer/Footer";

import WPPage from '../Pages/WPPage';
import HomePage from '../Pages/HomePage';
import CalendarPage from '../Pages/CalendarPage';

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
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/calendar" component={CalendarPage} />
              <Route path="/:slug" component={WPPage} />
            </Switch>

            <Link to="/test/test-page">WP Test Page</Link>
          </main>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
