import React, { Component } from 'react';
import styled from 'styled-components';
import { HR } from '../Elements/Elements';
import { Container, Row, Column } from '../Grid/Grid';

import HomeSlide from '../HomeSlide/HomeSlide';

import teachingGraphic from '../../img/deconstructing.png';
import callForSpeakers from '../../img/callForSpeakers.jpg';
export default class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <HomeSlide />

        <Container>
          <Row>
            <Column width={1}>
              <h1>Empowering you to enhance learning environments and advance student success</h1>

              <p>
                Whether you're a new or experienced faculty member, the Teaching & learning Excellence Division can help you further your teaching practice. Use the links at the top to learn more.
              </p>

              <div><a href="#0" className="button">Initiate a Project</a></div>
              <div><a href="#0" className="button">Get Help</a></div>
            </Column>
          </Row>


          <Row>
            <Column width={[1, 1 / 2]}>
              <img style={{ maxWidth: '100%' }} src="https://imgplaceholder.com/420x320/cccccc/333333/fa-image" alt="" />
            </Column>

            <Column width={[1, 1 / 2]}>
              <p>#TXDigicon</p>

              <p>Austin Community College is inviting faculty members from across Texas in higher education to attend our Texas Digital Learning Conference (#TXdigicon) on October 25-26th.</p>

              <p>Digital Learning promotes personlalized learning, provides data for student support, frees time for active and collaborative strategies, and helps close equity gaps.</p>

              <button className="button">Register</button>
            </Column>
            <HR mx='1rem' mt={4} />
          </Row>

          <Row>
            <Column width={[1, 1 / 2]}>
              <Row as="section">
                <Column as="section" width={1} px={0}>
                  <h2>Culturally Responsive Teaching</h2>
                  <Row>
                    <Column width={1 / 2}>
                      <img src={teachingGraphic} alt="" />
                    </Column>
                    <Column width={1 / 2}>
                      <h3>5 Ways to Challenge you Implicit Bias</h3>
                      <p>
                        Our 2018-2019 calendar emphasizes developing an understanding & responding to the context of your classroom. We start with an ...
                      </p>

                      <a href="#0">More ></a>
                    </Column>
                  </Row>

                  <HR my={4} />
                </Column>

                <Column as="section" width={1} px={0}>
                  <h2>In the Spotlight</h2>
                  <Row>
                    <Column width={1 / 2}>
                      <img src={callForSpeakers} alt="" />
                    </Column>
                    <Column width={1 / 2}>
                      <h3>Call for Speakers: Global Issues Speaker Series</h3>
                      <p>
                        International Programs is seeking ACC faculty who would like to share their global expertise in their Spring 2019 "Global Issues Speaker Series"
                      </p>

                      <a href="#0">More ></a>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Column>

            <Column width={[1, 1 / 2]} as="section" p={'2rem'}>
              <div style={{ background: '#ccc', padding: '1rem', height: '100%' }}>
                <h2>Events & Important Dates</h2>

                <h3>This Week</h3>

                <EventList>
                  <li>Nov 8:<a href="#0">Diversity & Equity: What's the Difference?</a></li>
                  <li>Nov 8:<a href="#0">Computerside Chats</a></li>
                  <li>Nov 8 & 9:<a href="#0">Sabbatical Info Sessions</a></li>
                  <li>Nov 9:<a href="#0">Distance Education Symposium</a></li>
                  <li>Nov 9:<a href="#0">EduTech</a></li>
                  <li>Nov 10:<a href="#0">ACC Boots & Bats Gala</a></li>
                  <li>Submit by Nov 16:<a href="#0">Performances for National Day of Racial Healing</a></li>
                  <li>Apply bo Nov 16:<a href="#0">Lilly Conference Schoilarships</a></li>
                </EventList>

                <a href="#0">More Events ></a>
              </div>
            </Column>
          </Row>

          <Row>
            <Column width={1}>
              <StayUpdated><span>Stay Updated</span></StayUpdated>
              <ul>
                <li>Item One</li>
                <li>Item Two</li>
                <li>Item Three</li>
              </ul>
            </Column>
          </Row>
        </Container>


      </React.Fragment>
    )
  }
}

const EventList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

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

  span {
    display: block;
    padding: 0 4rem;
    flex-shrink: 0;
  }

  &:before,
  &:after {
    content: '';
    border-bottom: 2px solid rgba(26,82,118, 0.35);
    width: 100%;
  }
`;