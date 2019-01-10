import React from "react";
import styled from "styled-components";
import { Container, Row, Column } from "../Grid/Grid";

import CalendarGrid from "../CalendarGrid/CalendarGrid";
import { HR } from "../Elements/Elements";

export default function CalendarPage() {
  return (
    <Wrapper>
      <Container>
        <Row>
          <Column width={1}>
            <h1>Calendar</h1>
            <HR />
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
