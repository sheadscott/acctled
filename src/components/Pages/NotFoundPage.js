
import React from "react";
import { Container, Row, Column } from "../Grid/Grid";
import { Heading } from "../Elements/Elements";

export default function NotFoundPage() {
  return (
      <Container mt={'1.5rem'}>
        <Row>
          <Column width={1}>
            <Heading as="h1" caps={true} underline={true}>
              Looks like there isn't anything here
            </Heading>
          </Column>
        </Row>
      </Container>
  );
}