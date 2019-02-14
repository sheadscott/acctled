import React, { Component } from "react";
import Axios from "axios";
import styled from "styled-components";
import { HR, Heading } from "../Elements/Elements";
import { Container, Row, Column } from "../Grid/Grid";

import HomeSlider from "../HomeSlider/HomeSlider";
import EventList from "../EventList/EventList";
import Parser from "../Parser/Parser"

import { ReactComponent as YouTube } from "../../img/youtube.svg";
import { ReactComponent as Twitter } from "../../img/twitter.svg";
import { ReactComponent as Instagram } from "../../img/instagram.svg";
import { ReactComponent as Facebook } from "../../img/facebook.svg";
export default class HomePage extends Component {
  state = {
    pageContent: {}
  };

  componentDidMount() {
    Axios.get(
      `https://instruction.austincc.edu/tled/wp-json/wp/v2/pages?slug=home`
    ).then(response => {
      this.setState({
        pageContent: response.data[0]
      });

      const pageSections = {};
      response.data[0].acf.layouts.forEach(item => {
        if (item.id) {
          pageSections[item.id] = item;
        }
      });

      this.setState({ pageSections });
    });
  }

  render() {
    const pageContent = this.state.pageContent;
    const pageSections = this.state.pageSections;
    const ACFData = pageContent ? this.state.pageContent.acf : null;

    return (
      <React.Fragment>
        <HomeSlider />

        <Container>
          {ACFData && ACFData.sidebar_left && (
            <React.Fragment>
              <Intro>
                <Column width={[1, "35%"]} pr={[0, "1rem"]} order={[2, 1]}>
                  <section style={{ textAlign: "center" }}>
                    <Parser>{ACFData.sidebar_left}</Parser>
                  </section>
                  
                </Column>
                {/* Empowering Segement */}
                <Column
                  width={[1, "65%"]}
                  pl={[0, "1rem"]}
                  mb={["2rem", 0]}
                  order={[1, 2]}
                >
                  {pageContent && (
                    <section><Parser>{pageContent.content.rendered}</Parser></section>
                  )}
                </Column>
              </Intro>
            </React.Fragment>
          )}

          {/* Featured */}
          {pageSections && pageSections.featured && (
            <Row>
              <HR my={"4rem"} />
              <Column width={[1, 1 / 2]}>
                <div><Parser>{this.state.pageSections.featured.column_1}</Parser></div>
              </Column>

              <Column width={[1, 1 / 2]} pl={[0, "4rem"]}>
                <div><Parser>{this.state.pageSections.featured.column_2}</Parser></div>
              </Column>
              <HR mt={"3rem"} mb={"2rem"} />
            </Row>
          )}

          <Row>
            <Column width={[1, 1 / 2]}>

              {/* Culturally Responsive Teaching */}
              <Row as="section">
                {pageSections && pageSections.culturallyResponsiveTeaching && (
                  <React.Fragment>
                    <Column as="section" width={1} px={0}>
                      <Heading
                        as="h2"
                        fontSize={"1.3rem"}
                        underline={false}
                        caps={true}
                        mb={'1.5rem'}
                      >
                        <Parser>{this.state.pageSections.culturallyResponsiveTeaching.heading}</Parser>
                      </Heading>
                      <Row>
                        <Column
                          width={[1, 1, 1 / 2]}
                          px={0}
                          style={{ paddingRight: "2rem" }}
                        >
                          <div><Parser>{this.state.pageSections.culturallyResponsiveTeaching.column_1}</Parser></div>
                        </Column>
                        <Column width={[1, 1, 1 / 2]}>
                          <div><Parser>{this.state.pageSections.culturallyResponsiveTeaching.column_2}</Parser></div>
                        </Column>
                      </Row>
                    </Column>
                    <HR my={4} />
                  </React.Fragment>
                )}

                {/* In The Spotlight */}
                {pageSections && pageSections.spotlight && (
                  <Column as="section" width={1} px={0}>
                    <Heading
                      as="h2"
                      fontSize={"1.3rem"}
                      underline={false}
                      caps={true}
                      mb={'1.5rem'}
                    >
                      <Parser>{this.state.pageSections.spotlight.heading}</Parser>
                    </Heading>
                    <Row>
                      <Column
                        width={[1, 1, 1 / 2]}
                        px={0}
                        style={{ paddingRight: "2rem" }}
                      >
                        <div><Parser>{this.state.pageSections.spotlight.column_1}</Parser></div>
                      </Column>
                      <Column width={[1, 1, 1 / 2]}>
                        <div><Parser>{this.state.pageSections.spotlight.column_2}</Parser></div>
                      </Column>
                    </Row>
                  </Column>
                )}
              </Row>
            </Column>

            {/* Events and Important Dates */}
            <Column width={[1, 1 / 2]} as="section" pl={[0, "4rem"]}>
              <EventList length="10" />
            </Column>
          </Row>

          {/* Stay Updated */}
          <Row py="4rem">
            <Column width={1}>
              <StayUpdated>
                <span>Stay Updated</span>
              </StayUpdated>
              <SocialMediaList>
                <li>
                  <a href="https://sites.austincc.edu/tledupdates/newsletter/" className="button">
                    TLED NEWSLETTER
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UChxBfVNHbWUc5qfcl8XgL9g" title="youtube">
                    <YouTube />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/accTLED/" title="facebook">
                    <Facebook />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/accTLED" title="twitter">
                    <Twitter />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/acctled/" title="instagram">
                    <Instagram />
                  </a>
                </li>
              </SocialMediaList>
            </Column>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const Intro = styled(Row)`
  h2 {
    font-size: 1.6rem !important;
    font-weight: 700 !important;
  }
  a.button {
    margin: 0 1rem;
    @media (max-width: 400px) {
      margin: .5rem 1rem;
    }
  }
`;

const StayUpdated = styled.h2`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #555;
  font-size: 1.3rem;

  span {
    display: block;
    padding: 0 1rem;
    flex-shrink: 0;
    @media (min-width: 600px) {
      padding: 0 4rem;
    }
  }

  &:before,
  &:after {
    content: "";
    border-bottom: 2px solid rgba(26, 82, 118, 0.35);
    width: 100%;
  }
`;

const SocialMediaList = styled.ul`
  margin: 2rem 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  li {
    margin: 0 3rem;
  }

  a {
    display: block;
    height: 100%;
  }

  a.button {
    background: rgb(91, 43, 112);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin-top: 5px;
  }

  svg {
    fill: rgb(91, 43, 112);
    width: 30px;
  }

  a[title="youtube"] svg {
    width: 40px;
  }
`;
