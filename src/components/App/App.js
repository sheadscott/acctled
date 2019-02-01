import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Drawer from "../Drawer/Drawer";
import Search from "../Search/Search";
import TitleBar from "../TitleBar/TitleBar";
import SecondaryNav from "../SecondaryNav/SecondaryNav";
import Footer from "../Footer/Footer";

import WPPage from "../Pages/WPPage";
import HomePage from "../Pages/HomePage";
import CalendarPage from "../Pages/CalendarPage";
import ReportsPage from "../Pages/ReportsPage";
import SearchPage from "../Pages/SearchPage";
import NotFoundPage from "../Pages/NotFoundPage";

import "./App.css";
class App extends Component {
  state = {
    searchExpanded: false,
    drawerExpanded: false,
    titleBarItems: [],
    secondaryNavItems: [],
    subMenuState: []
  };

  componentDidMount() {
    // Primary Nav - passed to Drawer and TitleBar
    axios
      .get(
        "https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/3"
      )
      .catch(function(error) {
        // handle error
        console.log("Primary Nav: ", error);
      })
      .then(response => {
        const titleBarItems = this.setState({
          titleBarItems: response.data.items
        });
      });
    // Secondary Nav - passed to Drawer and SecondaryNav
    axios
      .get(
        "https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/4"
      )
      .catch(function(error) {
        // handle error
        console.log("SecondaryNav: ", error);
      })
      .then(response => {
        console.log(response.data.items);
        this.setState({
          secondaryNavItems: response.data.items,
          subMenuState: response.data.items.map(item => false)
        });
      });
  }

  toggleSearch = event => {
    this.setState(prevState => {
      return {
        searchExpanded: !prevState.searchExpanded
      };
    });

    if (event) {
      event.preventDefault();
    }
  };

  searchSubmitted = () => {
    this.setState({ searchExpanded: false });
  };

  toggleDrawer = () => {
    this.setState(prevState => {
      return { drawerExpanded: !prevState.drawerExpanded };
    });
  };

  // toggle a menu item open or closed
  toggleSubMenu = (event, num) => {
    const expandedState = this.state.subMenuState.map((item, index, arr) => {
      if (index === num) {
        return !item;
      }
      return false;
    });
    this.setState({ subMenuState: expandedState });
    if (event) {
      event.stopPropagation();
    }
  };

  // close all menu items
  cancelSubMenuState = () => {
    const expandedState = this.state.subMenuState.map(
      (item, index, arr) => false
    );
    this.setState({ subMenuState: expandedState });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header className="App-header">
            <Drawer
              drawerState={this.state.drawerExpanded}
              toggleDrawer={this.toggleDrawer}
              titleBarItems={this.state.titleBarItems}
              secondaryNavItems={this.state.secondaryNavItems}
            />
            <Search
              searchExpanded={this.state.searchExpanded}
              searchSubmitted={this.searchSubmitted}
            />
            <TitleBar
              titleBarItems={this.state.titleBarItems}
              searchExpanded={this.state.searchExpanded}
              toggleSearch={this.toggleSearch}
              toggleDrawer={this.toggleDrawer}
            />
            <SecondaryNav
              secondaryNavItems={this.state.secondaryNavItems}
              subMenuState={this.state.subMenuState}
              toggleSubMenu={this.toggleSubMenu}
              cancelSubMenuState={this.cancelSubMenuState}
            />
          </Header>

          <Main>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/search/:query" component={SearchPage} />
              <Route path="/calendar" component={CalendarPage} />
              <Route path="/reports" component={ReportsPage} />
              <Route path="/404" component={NotFoundPage} />
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
