import React, { Component } from "react";
import Axios from "axios";

export default class Footer extends Component {
  state = {
    footerItems: []
  };
  componentDidMount() {
    Axios.get(
      "https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/5"
    ).then(response => {
      const footerItems = response.data;
      console.log("Footer Menu", footerItems);
      this.setState({ footerItems });
    });
  }
  render() {
    return (
      <footer>
        <p>This is the Footer</p>
      </footer>
    );
  }
}
