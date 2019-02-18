
import React from "react";
import { Container, Row, Column } from "../Grid/Grid";
import { Heading } from "../Elements/Elements";
import {Helmet} from 'react-helmet';

export default function NotFoundPage() {
  return (
      <Container mt={'1.5rem'}>
        <Helmet>
            <title>Page Not Found</title>
        </Helmet>
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