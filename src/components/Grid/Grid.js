import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';

const Container = styled(Box)`
  max-width: 75em;
  width: 100%;
  box-sizing: border-box;
`

Container.defaultProps = {
  mx: 'auto',
  px: '2rem'
}

const Row = styled(Flex)`
  // border: 1px dotted blue;
`;

Row.defaultProps = {
  flexWrap: 'wrap',
  // mx: '-1rem'
}

const Column = styled(Box)`
  // border: 1px dotted red;
`;

Column.defaultProps = {
  // px: '1rem'
}

export { Container, Row, Column }
