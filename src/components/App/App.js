import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import TitleBar from "../TitleBar/TitleBar";
import SecondaryNav from "../SecondaryNav/SecondaryNav";
import Footer from "../Footer/Footer";

import Page from "../Page/Page";

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
            <Route path="/" exact component={Page} />
            <Route path="/test/:slug" component={Page} />
          </main>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
