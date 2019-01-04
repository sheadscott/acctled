import React, { Component } from "react";
import Axios from 'axios';
import styled from "styled-components";
import { HR, Heading } from "../Elements/Elements";
import { Container, Row, Column } from "../Grid/Grid";

import HomeSlider from "../HomeSlider/HomeSlider";

import { ReactComponent as YouTube } from "../../img/youtube.svg";
import { ReactComponent as Twitter } from "../../img/twitter.svg";
import { ReactComponent as Instagram } from "../../img/instagram.svg";
import { ReactComponent as Facebook } from "../../img/facebook.svg";
export default class HomePage extends Component {
  state = {
    pageContent: {}
  }

  componentDidMount() {
    Axios.get(`https://instruction.austincc.edu/tled/wp-json/wp/v2/pages?slug=home`).then(response => {
      this.setState({
        pageContent: response.data[0],
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
              <Intro flexWrap="nowrap">
                <Column width={[1, '35%']}>
                  <section dangerouslySetInnerHTML={{ __html: ACFData.sidebar_left }} style={{ textAlign: 'center' }} />
                </Column>

                <Column width={[1, '65%']}>
                  {pageContent && <section dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} />}
                </Column>
              </Intro>

            </React.Fragment>
          )}


          {pageSections && pageSections.featured && (
            <Row>
              <HR mx="1rem" my={'4rem'} />
              <Column width={[1, 1 / 2]}>
                <div dangerouslySetInnerHTML={{ __html: this.state.pageSections.featured.column_1 }} />
              </Column>

              <Column width={[1, 1 / 2]}>
                <div dangerouslySetInnerHTML={{ __html: this.state.pageSections.featured.column_2 }} />
              </Column>
              <HR mx="1rem" mt={'3rem'} mb={'2rem'} />
            </Row>
          )}

          <Row>
            <Column width={[1, 1 / 2]}>
              <Row as="section">
                {pageSections && pageSections.culturallyResponsiveTeaching && (
                  <React.Fragment>
                    <Column as="section" width={1} px={0}>
                      <Heading as="h2" fontSize={'1.3rem'} underline="false" caps="true" dangerouslySetInnerHTML={{ __html: this.state.pageSections.culturallyResponsiveTeaching.heading }} />
                      <Row>
                        <Column width={[1, 1, 1 / 2]} px={0} style={{ paddingRight: '1rem' }}>
                          <div dangerouslySetInnerHTML={{ __html: this.state.pageSections.culturallyResponsiveTeaching.column_1 }} />
                        </Column>
                        <Column width={[1, 1, 1 / 2]}>
                          <div dangerouslySetInnerHTML={{ __html: this.state.pageSections.culturallyResponsiveTeaching.column_2 }} />
                        </Column>
                      </Row>
                    </Column>
                    <HR my={4} />
                  </React.Fragment>
                )}


                {pageSections && pageSections.spotlight && (
                  <Column as="section" width={1} px={0}>
                    <Heading as="h2" fontSize={'1.3rem'} underline="false" caps="true" dangerouslySetInnerHTML={{ __html: this.state.pageSections.spotlight.heading }} />
                    <Row>
                      <Column width={[1, 1, 1 / 2]} px={0} style={{ paddingRight: '1rem' }} >
                        <div dangerouslySetInnerHTML={{ __html: this.state.pageSections.spotlight.column_1 }} />
                      </Column>
                      <Column width={[1, 1, 1 / 2]}>
                        <div dangerouslySetInnerHTML={{ __html: this.state.pageSections.spotlight.column_2 }} />
                      </Column>
                    </Row>
                  </Column>
                )}
              </Row>
            </Column>

            <Column width={[1, 1 / 2]} as="section" p={"2rem"}>
              <div
                style={{ background: "rgb(241, 241, 241)", padding: "3rem", height: "100%" }}
              >
                <Heading as="h2" fontSize={'1.3rem'} underline="false" caps="true">Events & Important Dates</Heading>

                <Heading as="h3" fontSize={'1.3rem'} color={'rgb(93, 93, 93)'} style={{ fontWeight: 400 }}>This Week</Heading>

                <EventList>
                  <li>
                    Nov 8:
                    <a href="#0">Diversity & Equity: What's the Difference?</a>
                  </li>
                  <li>
                    Nov 8:<a href="#0">Computerside Chats</a>
                  </li>
                  <li>
                    Nov 8 & 9:<a href="#0">Sabbatical Info Sessions</a>
                  </li>
                  <li>
                    Nov 9:<a href="#0">Distance Education Symposium</a>
                  </li>
                  <li>
                    Nov 9:<a href="#0">EduTech</a>
                  </li>
                  <li>
                    Nov 10:<a href="#0">ACC Boots & Bats Gala</a>
                  </li>
                  <li>
                    Submit by Nov 16:
                    <a href="#0">
                      Performances for National Day of Racial Healing
                    </a>
                  </li>
                  <li>
                    Apply bo Nov 16:
                    <a href="#0">Lilly Conference Schoilarships</a>
                  </li>
                </EventList>

                <a href="#0">More Events ></a>
              </div>
            </Column>
          </Row>

          <Row>
            <Column width={1}>
              <StayUpdated>
                <span>Stay Updated</span>
              </StayUpdated>
              <SocialMediaList>
                <li><a href="#0" className="button">TLED NEWSLETTER</a></li>
                <li><a href="#0" title="youtube"><YouTube /></a></li>
                <li><a href="#0" title="facebook"><Facebook /></a></li>
                <li><a href="#0" title="twitter"><Twitter /></a></li>
                <li><a href="#0" title="instagram"><Instagram /></a></li>
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
  }
`;

const EventList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  color: rgb(93, 93, 93);

  li {
    margin-bottom: 1rem;
    font-weight: bold;
  }

  a {
    display: inline-block;
    margin-left: 5px;
    font-weight: normal;
    text-decoration: none;
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
    padding: 0 4rem;
    flex-shrink: 0;
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
