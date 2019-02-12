import React, { Component } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../Grid/Grid";
// import MenuItem from "../MenuItem/MenuItem";
import { A } from '../Elements/Elements';
// import uuid from 'uuid/v4';
import decode from "unescape";

import Dropdown from '../Dropdown/index';

/*
  This component should go under the title bar
  according to the comp is has menu items like: about, faculty support, champions of teaching, etc
  it should be present on every page
  will include dropdowns, with one open at a time
  open / closed state is managed here in the expanded array [true, false, false]
  the wrapper container has an onclick handler to act like a universal cancel, closing all menus
*/

export default class SecondaryNav extends Component {
  render() {
    return (
      <Wrapper
        onClick={this.props.cancelSubMenuState}
        className={this.props.subMenuState.includes(true) ? "expanded" : null}
      >
        <Container as="div">
          <DropdownMenu
            data={this.props.secondaryNavItems}
            renderLink={(data) => <A
              data={data.type === 'post_type' ? data : null}
              href={data.type === 'custom' ? data.url : null}
              className="iw-dropdown__menuLink"
            >
              {decode(data.title)}
            </A>}
            renderChildren={(items, toggleMenu, focusElement, blurElement) =>
              items.map(child => {
                // menu item has children
                if (child.children) {
                  return (
                    <ul key={child.id} style={{
                      listStyle: 'none',
                      margin: '0 0 3rem',
                      breakInside: 'avoid'
                    }}>
                      <li>
                        <ListHeading>{child.title}</ListHeading>
                        <ul style={{
                          listStyle: 'none',
                          margin: 0,
                        }}>
                          {child.children.map(childLink => (
                            <li key={childLink.id} className="iw-dropdown__subItem">
                              <A
                                data={childLink.type === 'post_type' ? childLink : null}
                                href={childLink.type === 'custom' ? childLink.url : null}
                                className="iw-dropdown__subLink"
                                onFocus={() => focusElement()}
                                onBlur={async () => {
                                  const temp = await blurElement();
                                  if (temp.length === 0) {
                                    toggleMenu();
                                  }
                                }}
                              >
                                {decode(childLink.title)}
                              </A>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  );
                }

                // menu item is a single link
                return (
                  <li key={child.id} className="iw-dropdown__subItem">
                    <A
                      data={child.type === 'post_type' ? child : null}
                      href={child.type === 'custom' ? child.url : null}
                      className="iw-dropdown__subLink"
                      onFocus={() => focusElement()}
                      onBlur={async () => {
                        const temp = await blurElement();
                        if (temp.length === 0) {
                          toggleMenu();
                        }
                      }}
                    >
                      {decode(child.title)}
                    </A>
                  </li>
                );
              })}
          />
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: #133952;
  position: relative;
  display: none;

  &.expanded:before {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // background: pink;
  }

  @media(min-width: 640px) {
    display: block;
  }
`;

const DropdownMenu = styled(Dropdown)`
  margin: 0 -0.5rem;
  list-style: none;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
    padding: 0;
    justify-content: center;
  }

  .iw-dropdown__menuItem {
    margin: 0 0.5rem;
  }

  .iw-dropdown__menuLink,
  .iw-dropdown__menuToggle {
    background: transparent;
    border: none;
    font-size: 1rem;
    display: block;
    color: #f1ebab;
    text-decoration: none;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    box-sizing: border-box;
    height: 100%;
    font-family: Montserrat;
    line-height: 1em;
    text-align: center;
    @media (min-width: 800px) {
      padding: 1rem;
    }
  }

  .iw-dropdown__menuLink:hover,
  .iw-dropdown__menuLink:focus,
  .iw-dropdown__menuLink:active,
  .iw-dropdown__menuToggle:hover,
  .iw-dropdown__menuToggle:focus,
  .iw-dropdown__menuToggle:active,
  .iw-dropdown__menuToggle.active {
    color: white;
    background: #698da4;
  }

  .iw-dropdown__menuToggle {}
  .iw-dropdown__submenuWrapper {
    background: #b7c9d2;
    width: 100%;
    padding: 2rem;

    &[aria-expanded="true"] {
      left: 0;
    }
  }
  .iw-dropdown__submenu {
    columns: 1;
    column-gap: 2rem;
    margin: 0 auto;
    max-width: 60em;
    padding: 0 1rem;
    @media (min-width: 500px) {
      columns: 2;
    }
    @media (min-width: 600px) {
      columns: 3;
    }
    @media (min-width: 900px) {
      columns: 5;
    }
  }
  .iw-dropdown__subItem {
    margin-bottom: 1rem;
    position: relative;
    line-height: 1.3rem;

    &:before {
      content: '•';
      display: block;
      position: absolute;
      left: -0.75rem;
      top: -1px;
      color: #153b53;
    }
  }
  .iw-dropdown__subLink {
    color: #4c4d4f;
    &:hover {
      color: #103147;
      text-decoration: underline;
    }
  }
`;

const ListHeading = styled.div`
  // color: #153b53;
  // color: #4c4d4f;
  color: #1d1d1d;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  line-height: 1.3rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #1d1d1d;
`;






// <NavList>
//             {this.props.secondaryNavItems.map((item, index, arr) => {
//               if (item.children) {
//                 return (
//                   <ListItem
//                     key={item.id}
//                     onClick={e => this.props.toggleSubMenu(e, index)}
//                   >
//                     <MenuItem
//                       expanded={this.props.subMenuState[index]}
//                       submenuItems={item.children}
//                     >
//                       {item.title}
//                     </MenuItem>
//                   </ListItem>
//                 );
//               }

//               // Internal links using React Router
//               if (item.type === "post_type") {
//                 return (
//                   <ListItem
//                     key={item.id}
//                     onClick={() => this.props.toggleSubMenu(index)}
//                   >
//                     <Link className="parentLink" to={`/${item.object_slug}`}>
//                       {item.title}
//                     </Link>
//                   </ListItem>
//                 );
//               }

//               // external links
//               return (
//                 <ListItem
//                   key={item.id}
//                   onClick={() => this.props.toggleSubMenu(index)}
//                 >
//                   <a className="parentLink" href={item.url}>
//                     {item.title}
//                   </a>
//                 </ListItem>
//               );
//             })}
//           </NavList>