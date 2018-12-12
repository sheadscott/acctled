import React, { Component } from "react";
import Axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, Row, Column } from "../Grid/Grid";
import { ReactComponent as TLEDLogo } from "../../img/tledLogo.svg";

export default class Footer extends Component {
  state = {
    footerItems: []
  };
  componentDidMount() {
    Axios.get(
      "https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/5"
    ).then(response => {
      const footerItems = response.data.items;
      console.log("Footer Menu", footerItems);
      this.setState({ footerItems });
    });
  }

  renderChildren = child => {
    // Internal links using React Router
    if (child.type === "post_type") {
      return (
        <li key={child.id}>
          <Link to={`/${child.object_slug}`}>{child.title}</Link>
        </li>
      );
    }
    // external links
    return (
      <a key={child.id} href={child.url}>
        {child.title}
      </a>
    );
  };

  render() {
    return (
      <Wrapper>
        <Container>
          <FooterHTML>
            <WpLinks>
              {this.state.footerItems.map(item => {
                return (
                  <ul key={item.id + "ul"}>
                    <h4>{item.title}</h4>
                    {item.children && item.children.map(this.renderChildren)}
                  </ul>
                );
              })}
            </WpLinks>
            <Contact>
              <TLEDLogo />
              <p>Address goes here</p>
            </Contact>
          </FooterHTML>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  background: #133952;
  * {
    color: white;
  }
`;
const FooterHTML = styled.footer`
  display: flex;
`;

const WpLinks = styled.div`
  columns: 3;
  column-width: 33%;
  flex: 3;

  ul {
    list-style: none inside none;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
    display: inline-block;
    font-size: 0.9em;
    margin-right: 10%;

    li {
      padding: 3px 0;
    }
  }
`;

const Contact = styled.div`
  flex: 1;
  margin-top: 34px;

  svg {
    width: 80%;
  }
`;
