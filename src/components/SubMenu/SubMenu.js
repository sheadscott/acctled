import React from 'react';
import styled from 'styled-components';
import { Container } from '../Grid/Grid';
import { A } from '../Elements/Elements';

/*
  Dropdown menu for secondary nav
  visibility should be controlled by its parent, MenuItem
*/

export default (props) => {
  return (
    <SubMenuWrapper className={props.expanded ? 'expanded' : null}>
      <StyledContainer p={4}>
        <SubMenu>
          {/*
            we need to do recursion, or just manually check one step deep.
          */}
          {props.items.map(item => {
            if (item.children) {
              return (
                <li style={{ breakInside: 'avoid' }} key={item.id}>
                  <ListHeading>{item.title}</ListHeading>

                  <SubMenuList>
                    {item.children.map(subitem => {
                      return <li key={subitem.id}><A data={subitem}>{subitem.title}</A></li>
                    })}
                  </SubMenuList>
                </li>
              )
            }

            return <li key={item.id}><A data={item}>{item.title}</A></li>
          })}
        </SubMenu>
      </StyledContainer>
    </SubMenuWrapper>
  )
}

const SubMenuWrapper = styled.div`
  position: absolute;
  z-index: 999;
  background: #b7c9d2;
  left: -999rem;
  width: 100%;

  &.expanded {
    left: 0;
  }
`;

const StyledContainer = styled(Container)`
  columns: 5;
  column-gap: 2rem;
`;

const SubMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  a {
    padding: 0 !important;
    color: #153b53 !important;
    text-transform: none !important;
  }
`;

const ListHeading = styled.div`
  color: #153b53;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const SubMenuList = styled.ul`
  padding: 0;
  margin: 0 0 2rem 0 !important;
  list-style: none;

  li {
    margin-bottom: 1rem;
    position: relative;

    &:before {
      content: '•';
      display: block;
      position: absolute;
      left: -0.75rem;
      top: -1px;
      color: #153b53;
    }
  }

  a {
    
  }
`;
