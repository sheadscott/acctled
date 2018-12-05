import React, { Component } from "react";
import Axios from "axios";
import { kebabToCamelCase, spacesToBreak } from "../../helpers";
import styled from "styled-components";

// Import Images
import accLogo from "../../img/accLogo.svg";
import tledLogo from "../../img/tledLogo.svg";
import calendarIcon from "../../img/calendarIcon.svg";
import searchIcon from "../../img/searchIcon.svg";
import hamburgerMenu from "../../img/hamburgerMenu.svg";

/*
  The title bar is the top level nav
  it includes the logo, search, calendar and hamburger menu button
  its included on every page
  icons are svg from material design
*/

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background: #666;
`;

const LinkWrap = styled.div``;

// max-width: ${props => props.longestWord / 2}em;
const A = styled.a`
  flex: 2;
  color: white;
  display: inline-block;
  font-size: 1em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Icon = styled.a`
  img {
    height: 50px;
    padding: 0 10px;
  }

  img#acc-home {
    border-right: 1px solid #fff;
  }

  img#calendar {
    width: 30px;
  }

  img#search {
    width: 36px;
  }

  img#hamburgerMenu {
    width: 36px;
    padding-left: 5px;
  }
`;

export default class TitleBar extends Component {
  state = {
    titleBarItems: []
  };
  componentDidMount() {
    Axios.get(
      "https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/3"
    ).then(response => {
      const titleBarItems = response.data.items;
      console.log(titleBarItems);
      this.setState({ titleBarItems });
    });
  }
  render() {
    return (
      <Nav>
        {this.state.titleBarItems.map(item => {
          // Use slug to assign icons to links
          const itemContent = {
            accHome: { accLogo },
            tledHome: { tledLogo },
            calendar: { calendarIcon },
            search: { searchIcon }
          };

          const camelSlug = kebabToCamelCase(item.object_slug);
          const icon = itemContent[camelSlug];

          if (icon) {
            return (
              <Icon key={item.id} href={item.url}>
                <img
                  id={item.object_slug}
                  src={Object.values(icon)}
                  alt={item.title}
                />
              </Icon>
            );
          }
          return (
            <A
              dangerouslySetInnerHTML={{ __html: spacesToBreak(item.title) }}
              key={item.id}
              href={item.url}
            />
          );
        })}
        <Icon href="#">
          <img id="hamburgerMenu" src={hamburgerMenu} alt="Mobile Menu" />
        </Icon>
      </Nav>
    );
  }
}
