import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';
import { Helmet } from 'react-helmet';
import { Container } from '../Grid/Grid';
import { A, Section, Heading } from '../Elements/Elements';
import { ReactComponent as DownArrowIcon } from '../../img/arrowDown.svg';
import TLEDStaff from '../directory/TLEDStaff'
import LibraryStaff from '../directory/LibraryStaff';

export default class StaffDirectoryPage extends Component {
  state = {};

  tledSheetId = '1hPYNTqMM-lQuiMNNYfOj2g6NfUhsnZoDb8eaVDodyd0';
  libSheetId = '1pchnW3O4xtOB_GGU7fJsbqzYTc4nOucBlqf7gx2gOhw';

  tledSheets = {
    tled: [1, 'Teaching & Learning Excellence Division'],
    facdev: [2, 'Office of Faculty & Instructional Development'],
    media: [3, 'Media Support Services'],
    multimedia: [4, 'Multimedia & Classroom Technology'],
    instructionaltech: [5, 'Office of Instructional Technology'],
    curriculumdev: [6, 'Office of Curriculum Development'],
    internships: [7, 'Office of Cooperative Education & Internships']
  };

  libSheets = {
    main: [1, 'Administrators'],
    cyp: [2, 'Cypress Creek'],
    evc: [3, 'Eastview'],
    elg: [4, 'Elgin'],
    hys: [5, 'Hays'],
    hlc: [6, 'Highland'],
    nrg: [7, 'Northridge'],
    rvs: [8, 'Riverside'],
    rrc: [9, 'Round Rock'],
    sgc: [10, 'San Gabriel'],
    sac: [11, 'South Austin'],
  };

  componentDidMount() {
    // Get the named anchor ie. #tled
    const hash = this.props.location.hash;
    if (hash) {
      const hashName = hash.replace(/^#/, '');
      this.setState({ expanded: hashName });

      if (hash !== '#library') {
        this.handleClick(null, hashName, this.tledSheets, this.tledSheetId);
      }
    }
  }

  handleClick(e, sheet, sheets, sheetId) {
    const deptContainer = this[sheet + 'Ref'];
    if (!this.state[sheet]) {
      // Disable onclick while loading
      deptContainer.style.cssText = 'pointer-events: none;';

      Axios.get(
        `https://spreadsheets.google.com/feeds/list/${sheetId}/${
          sheets[sheet][0]
        }/public/values?alt=json`
      )
        .catch(function(error) {
          // handle error
          console.error('*** ERROR *** StaffDirectoryPage.js: ', error);
        })
        .then(response => {
          const title = sheets[sheet][1];
          const staffData = response.data.feed.entry;
          this.setState({ [sheet]: { title, staffData } }, () => {
            // Re-enable onclick
            deptContainer.style.cssText = 'pointer-events: auto;';
            deptContainer.querySelector('.loading').classList.add('loaded');
            deptContainer.classList.toggle('active');
          });
        });
    } else {
      deptContainer.classList.toggle('active');
    }
  }

  render() {
    const title = 'TLED Staff Directory';

    return (
      <Container>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Section>
          <Heading
            as="h1"
            caps={true}
            underline={true}
            ref={el => (this.heading = el)}
          >
            {title}
          </Heading>

          <Accordion accordion={false}>
            {Object.keys(this.tledSheets).map((sheet, index) => {
              // console.log(sheet + "Ref");
              return (
                <div
                  id={sheet}
                  ref={el => (this[sheet + 'Ref'] = el)}
                  key={sheet}
                >
                  <AccordionItem
                    key={index}
                    expanded={this.state.expanded === sheet}
                    onClick={e => {
                      this.handleClick(
                        e,
                        sheet,
                        this.tledSheets,
                        this.tledSheetId
                      );
                    }}
                  >
                    <StyledAccordionItemTitle>
                      {this.tledSheets[sheet][1]}
                      <ArrowIcon role="presentation" />
                    </StyledAccordionItemTitle>
                    <StyledAccordionItemBody>
                      <Loading className="loading">Loading...</Loading>
                      {this.state[sheet] && (
                        <Department>
                          {this.state[sheet].staffData &&
                            <TLEDStaff data={this.state[sheet].staffData} />}
                        </Department>
                      )}
                    </StyledAccordionItemBody>
                  </AccordionItem>
                </div>
              );
            })}

            {/* ##### Library ##### */}

            <AccordionItem
              id="library"
              expanded={this.state.expanded === 'library'}
            >
              <StyledAccordionItemTitle>
                Library Staff
                <ArrowIcon role="presentation" />
              </StyledAccordionItemTitle>
              <StyledAccordionItemBody>
                <Accordion accordion={false}>
                  {Object.keys(this.libSheets).map(sheet => (
                    <div
                      id={sheet}
                      ref={el => (this[sheet + 'Ref'] = el)}
                      key={sheet}
                    >
                      <AccordionItem
                        onClick={e => {
                          this.handleClick(
                            e,
                            sheet,
                            this.libSheets,
                            this.libSheetId
                          );
                        }}
                      >
                        <StyledAccordionItemTitle>
                          {this.libSheets[sheet][1]}
                          <ArrowIcon role="presentation" />
                        </StyledAccordionItemTitle>
                        <StyledAccordionItemBody>
                          <Loading className="loading">Loading...</Loading>
                          {this.state[sheet] && (
                            <Department>
                              {this.state[sheet].staffData &&
                              <LibraryStaff data={this.state[sheet].staffData} />} 
                            </Department>
                          )}
                        </StyledAccordionItemBody>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              </StyledAccordionItemBody>
            </AccordionItem>
          </Accordion>
        </Section>
      </Container>
    );
  }
}

const Department = styled.table`
  margin-bottom: 1rem;
  padding: 0;
  font-size: 1rem;

  thead tr {
    background: #666;
    color: white;
    cursor: pointer;
  }

  tbody {
    transition: opacity 0.4s;
    opacity: 1;

    &.preactive {
      display: table-row-group;
    }
  }

  a {
    text-decoration: underline;
  }

  td.phone {
    min-width: 140px;
  }
`;

const Loading = styled.div`
  margin-bottom: 1rem;
  &.loaded {
    display: none;
  }
`;

const StyledAccordionItemTitle = styled(AccordionItemTitle)`
  color: ${props => props.theme.colors.blue};
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #e6e6e6;
  padding: 1.25rem 1rem;
  position: relative;

  &:hover {
    background-color: #e6e6e6;
  }

  &:focus {
    outline: none;
    background-color: #e6e6e6;
  }

  &:before {
    font-size: 1.3rem;
    font-weight: 700;
    margin-top: -0.55rem;
  }

  &[aria-expanded='true'] > svg {
    transform: scaleY(-1);
  }
`;

const StyledAccordionItemBody = styled(AccordionItemBody)`
  padding: 1rem;
  border-bottom: 1px solid #e6e6e6;

  &.accordion__body {
    padding: 20px;
    display: block;
    animation: fadein 0.35s ease-in;
  }

  &.accordion__body--hidden {
    display: none;
    opacity: 0;
    animation: fadein 0.35s ease-in;
  }
`;

const ArrowIcon = styled(DownArrowIcon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  transition: transform 0.3s ease-out;

  path:first-child {
    fill: ${props => props.theme.colors.blue};
  }
`;
