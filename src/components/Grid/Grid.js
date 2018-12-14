import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';

const Container = styled(Box)`
  max-width: 75em;
`

Container.defaultProps = {
  mx: 'auto'
}

const Row = styled(Flex)`
  // margin-left: ${props => props.mx};
  // margin-right: ${props => props.mx};
  // padding: 2rem;
  padding: 2rem;
  margin: -2rem;
`;

Row.defaultProps = {
  flexWrap: 'wrap',
  // mx: '-1rem'
}

const Column = styled(Box)`
  padding-left: ${props => props.px};
  padding-right: ${props => props.px};
  // border: 1px dotted red;
`;

Column.defaultProps = {
  px: '1rem'
}

export { Container, Row, Column }
