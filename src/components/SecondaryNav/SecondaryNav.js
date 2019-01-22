import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../Grid/Grid";
import MenuItem from "../MenuItem/MenuItem";

/*
  This component should go under the title bar
  according to the comp is has menu items like: about, faculty support, champions of teaching, etc
  it should be present on every page
  will include dropdowns, with one open at a time
  open / closed state is managed here in the expanded array [true, false, false]
  the wrapper container has an onclick handler to act like a universal cancel, closing all menus
*/

export default class SecondaryNav extends Component {
  render() {
    return (
      <Wrapper
        onClick={this.props.cancelSubMenuState}
        className={this.props.subMenuState.includes(true) ? "expanded" : null}
      >
        <Container as="nav">
          <NavList>
            {this.props.secondaryNavItems.map((item, index, arr) => {
              if (item.children) {
                return (
                  <ListItem
                    key={item.id}
                    onClick={e => this.props.toggleSubMenu(e, index)}
                  >
                    <MenuItem
                      expanded={this.props.subMenuState[index]}
                      submenuItems={item.children}
                    >
                      {item.title}
                    </MenuItem>
                  </ListItem>
                );
              }

              // Internal links using React Router
              if (item.type === "post_type") {
                return (
                  <ListItem
                    key={item.id}
                    onClick={() => this.props.toggleSubMenu(index)}
                  >
                    <Link className="parentLink" to={`/${item.object_slug}`}>
                      {item.title}
                    </Link>
                  </ListItem>
                );
              }

              // external links
              return (
                <ListItem
                  key={item.id}
                  onClick={() => this.props.toggleSubMenu(index)}
                >
                  <a className="parentLink" href={item.url}>
                    {item.title}
                  </a>
                </ListItem>
              );
            })}
          </NavList>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: #133952;
  position: relative;

  &.expanded:before {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // background: pink;
  }
`;

const NavList = styled.ul`
  padding: 0.5rem 0;
  margin: 0 -0.5rem;
  list-style: none;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
    padding: 0;
    justify-content: center;
  }
`;

const ListItem = styled.li`
  margin: 0 0.5rem;

  .parentLink {
    background: transparent;
    border: none;
    font-size: 1rem;
    display: block;
    color: #f1ebab;
    text-decoration: none;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    box-sizing: border-box;
    height: 100%;
    font-family: Montserrat;
    @media (min-width: 800px) {
      padding: 1rem;
    }
  }

  .parentLink:hover,
  .parentLink:focus {
    color: white;
    background: #698da4;
  }
`;
