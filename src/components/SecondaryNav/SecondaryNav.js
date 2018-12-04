import React, { Component } from 'react';
import Axios from 'axios';

/*
  This component should go under the title bar
  according to the comp is has menu items like: about, faculty support, champions of teaching, etc
  it should be present on every page
  will include dropdowns
*/

export default class SecondaryNav extends Component {
  componentDidMount() {
    Axios.get('https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/4').then(response => {
      console.log('secondary menu data', response.data);
    });
  }
  render() {
    return (
      <div>
        Secondary Nav
      </div>
    )
  }
}
