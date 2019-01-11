import React, { Component } from "react";
import axios from "axios";
// import { kebabToCamelCase, spacesToBreak } from "../../helpers";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import Images
import { ReactComponent as ACCLogo } from "../../img/ACC.svg";
// import tledLogo from "../../img/tledLogo.svg";
import { ReactComponent as CalendarIcon } from "../../img/calendarIcon.svg";
import { ReactComponent as SearchIcon } from "../../img/searchIcon.svg";
import { ReactComponent as HamburgerMenu } from "../../img/hamburgerMenu.svg";

export default class TitleBar extends Component {
  state = {
    titleBarItems: []
  };
  componentDidMount() {
    axios
      .get(
        "https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/3"
      )
      .then(response => {
        const titleBarItems = response.data.items;
        // console.log("titlebar items", titleBarItems);
        this.setState({ titleBarItems });
      });
  }
  render() {
    return (
      <Nav>
        <SiteIdentity>
          <a title="ACC Home Link" href="http://www.austincc.edu">
            <ACCLogo />
          </a>

          <SiteTitle>
            <TLED to="/">TLED</TLED>
          </SiteTitle>
        </SiteIdentity>

        <TitleBarNav>
          {this.state.titleBarItems.map(item => {
            // Internal links using React Router
            if (item.type === "post_type") {
              return (
                <Link key={item.id} to={`/${item.object_slug}`}>
                  {item.title}
                </Link>
              );
            }

            // external links
            return (
              <a key={item.id} href={item.url}>
                {item.title}
              </a>
            );
          })}
        </TitleBarNav>

        <TitleBarControls>
          <Link to="/calendar" title="Link to Calendar Page" style={{ marginRight: '15px' }}>
            <CalendarIcon />
          </Link>

          <a role="button" style={{ marginRight: '15px' }} href="/#searchForm" onClick={e => this.props.toggleSearch(e)} aria-controls="searchForm" aria-expanded={this.props.searchExpanded} >
            <SearchIcon />
          </a>

          <Button>
            <HamburgerMenu />
          </Button>
        </TitleBarControls>
      </Nav>
    );
  }
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background: #666;
  padding: 10px;
  box-sizing: border-box;
`;

const SiteIdentity = styled.div`
  margin-right: 2rem;
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
`;

const TitleBarNav = styled.div`
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  display: none;

  @media (min-width: 800px) {
    display: flex;
  }

  a {
    color: white;
    display: block;
    font-size: 1rem;
    text-decoration: none;
    text-align: center;
    margin: 0 1rem;
    line-height: 1rem;

    @media (min-width: 960px) {
      margin: 0 2rem;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

const TitleBarControls = styled.div`
  margin-left: 50px;
  display: flex;
  flex-wrap: nowrap;
`;

const SiteTitle = styled.div`
  font-size: 1.4rem;
  padding: 0 0.5rem;
  border-left: 1px solid white;
  margin-left: 0.25rem;
`;

const TLED = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover,
  &:focus {
    color: white;
    text-decoration: underline;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
`;
