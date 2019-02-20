import React from "react";
import styled from "styled-components";
import { Container, Row, Column } from "../Grid/Grid";
import { Helmet } from 'react-helmet';

import CalendarGrid from "../CalendarGrid/CalendarGrid";
import { A, Heading } from "../Elements/Elements";
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const breadcrumbData = [
  {
    title: 'Home',
    url: '/'
  },
  {
    title: 'Calendar'
  }
]

export default function CalendarPage() {
  return (
    <Wrapper>
      <Container>
        <Helmet>
          <title>TLED Calendar</title>
        </Helmet>
        <Breadcrumbs data={breadcrumbData} />
        <Row>
          <Column width={1}>
            <Heading as="h1" caps={true} underline={true}>
              Calendar
            </Heading>
            <ButtonContainer>
              <A href="https://goo.gl/forms/0qht2jFfY2gqACcq2" className="button">Submit Event</A>
            </ButtonContainer>
            <CalendarGrid />
          </Column>
        </Row>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  text-align: center;
  a {
    margin-top: 0.5rem;
    margin-bottom: 0;
    background: rgba(91, 43, 112, 1);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    &:hover {
      background: rgba(91, 43, 112, 0.8);
    }
  }
`;