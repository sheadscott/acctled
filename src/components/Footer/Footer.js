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
          <Row flexWrap="noWrap">

            <WpLinks width={[1, '75%']}>
              {this.state.footerItems.map(item => {
                return (
                  <ul key={item.id + "ul"}>
                    <h4>{item.title}</h4>
                    {item.children && item.children.map(this.renderChildren)}
                  </ul>
                );
              })}
            </WpLinks>

            <Contact widht={[1, '25%']}>
              <TLEDLogo />

              <div className="vcard" style={{ marginLeft: '10px' }}>
                <div className="org">Austin Community College District</div>
                <div className="adr">
                  <div className="street-address">5930 Middle Fiskville Rd.</div>
                  <div>
                    <span className="locality">Austin</span>,
                    <span className="region">Texas</span>
                    <span className="postal-code">78752</span>
                  </div>
                  <div className="country-name">U.S.A.</div>
                </div>
                <div className="tel">512-223-4ACC (4222)</div>
              </div>
            </Contact>
          </Row>
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

const WpLinks = styled(Column)`
  columns: 3;
  column-width: 33%;

  ul {
    list-style: none inside none;
    page-break-inside: avoid;
    break-inside: avoid;
    display: inline-block;
    font-size: 0.9em;
    margin: 0;
    padding: 0;

    li {
      padding: 3px 0;
    }
  }
`;

const Contact = styled(Column)`
  margin-top: 34px;

  svg {
    max-width: 175px;
    margin-bottom: 2rem;
  }
`;
