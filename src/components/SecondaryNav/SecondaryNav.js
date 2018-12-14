import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { Container } from '../Grid/Grid';
import MenuItem from '../MenuItem/MenuItem';

/*
  This component should go under the title bar
  according to the comp is has menu items like: about, faculty support, champions of teaching, etc
  it should be present on every page
  will include dropdowns, with one open at a time
  open / closed state is managed here in the expanded array [true, false, false]
  the wrapper container has an onclick handler to act like a universal cancel, closing all menus
*/

export default class SecondaryNav extends Component {
  state = {
    data: [],
    expanded: []
  }
  componentDidMount() {
    Axios.get('https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/4').then(response => {
      const subMenuState = response.data.items.map(item => false);

      this.setState({
        data: response.data.items,
        expanded: subMenuState
      })
    });
  }

  // toggle a menu item open or closed
  toggleMenu = (event, num) => {
    const expandedState = this.state.expanded.map((item, index, arr) => {
      if (index === num) {
        return !item;
      }

      return false;
    })

    this.setState({ expanded: expandedState });

    if (event) {
      event.stopPropagation();
    }
  }

  // close all menu items
  cancelMenuState = () => {
    const expandedState = this.state.expanded.map((item, index, arr) => false);
    this.setState({ expanded: expandedState });
  }

  render() {
    return (
      <Wrapper onClick={this.cancelMenuState} className={this.state.expanded.includes(true) ? 'expanded' : null}>
        <Container as="nav">
          <NavList>
            {this.state.data.map((item, index, arr) => {

              if (item.children) {
                return (
                  <ListItem key={item.id} onClick={(e) => this.toggleMenu(e, index)}>
                    <MenuItem expanded={this.state.expanded[index]} submenuItems={item.children}>{item.title}</MenuItem>
                  </ListItem>
                )
              }

              // Internal links using React Router
              if (item.type === "post_type") {
                return <ListItem key={item.id} onClick={() => this.toggleMenu(index)}><Link to={`/${item.object_slug}`}>{item.title}</Link></ListItem>;
              }

              // external links
              return <ListItem key={item.id} onClick={() => this.toggleMenu(index)}><a href={item.url}>{item.title}</a></ListItem>
            })}
          </NavList>
        </Container>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #133952;

  &.expanded:before {
    content: '';
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
  padding: 0;
  margin: 0 -0.5rem;
  list-style: none;
  display: flex;
`;

const ListItem = styled.li`
  margin: 0 0.5rem;

  a,button {
    background: transparent;
    border: none;
    font-size: 1rem;
    display: block;
    color: #f1ebab;
    text-decoration: none;
    padding: 1rem
    text-transform: uppercase;
    box-sizing: border-box;
    height: 100%;
    font-family: Montserrat;
  }

  a:hover,
  a:focus,
  button:focus,
  button:active {
    color: white;
    background: #698da4;
  }
`;
