import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import styled from 'styled-components';
/*
  This component should go under the title bar
  according to the comp is has menu items like: about, faculty support, champions of teaching, etc
  it should be present on every page
  will include dropdowns
*/

export default class SecondaryNav extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    Axios.get('https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/4').then(response => {
      console.log('secondary menu data', response.data);
      this.setState({
        data: response.data.items
      })
    });
  }
  render() {
    return (
      <Wrapper>
        <nav>
          <NavList>
            {this.state.data.map(item => {

              // Internal links using React Router
              if (item.type === "post_type") {
                return <ListItem key={item.id}><Link to={`/${item.object_slug}`}>{item.title}</Link></ListItem>;
              }

              // external links
              return <ListItem key={item.id}><a href={item.url}>{item.title}</a></ListItem>
            })}
          </NavList>
        </nav>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background: #133952;
  padding: 1rem
`;

const NavList = styled.ul`
  padding: 0;
  margin: 0 -0.5rem;
  list-style: none;
  display: flex;
`;

const ListItem = styled.li`
  margin: 0 0.5rem;
  a {
    color: #f1ebab;
    text-decoration: none;
  }

  a:hover,
  a:focus {
    text-decoration: underline;
  }
`;
