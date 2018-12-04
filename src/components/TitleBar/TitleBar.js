import React, { Component } from 'react'
import Axios from 'axios';

/*
  The title bar is the top level nav
  it includes the logo, search, calendar and hamburger menu button
  its included on every page
  icons are svg from material design
*/

export default class TitleBar extends Component {
  componentDidMount() {
    Axios.get('https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/3').then(response => {
      console.log('title bar data', response.data);
    });
  }
  render() {
    return (
      <div>
        Title Bar Nav
      </div>
    )
  }
}

