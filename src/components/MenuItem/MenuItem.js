import React, { Component } from "react";
import SubMenu from "../SubMenu/SubMenu";

/*
  Top Level Menu Item
  Controls dropdown state for its children
*/

export default class MenuItem extends Component {
  render() {
    return (
      <React.Fragment>
        <button className="parentLink">{this.props.children}</button>

        <SubMenu
          items={this.props.submenuItems}
          expanded={this.props.expanded}
        />
      </React.Fragment>
    );
  }
}
