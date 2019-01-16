import React from "react";
import styled from "styled-components";
import { Container, Row, Column } from "../Grid/Grid";

import ReportsGrid from "../ReportsGrid/ReportsGrid";
import { Heading } from "../Elements/Elements";

export default function CalendarPage() {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Column width={1}>
            <Heading as="h1" caps={true} underline={true}>
              TLED EXECUTIVE REPORT
            </Heading>
            <ReportsGrid />
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
