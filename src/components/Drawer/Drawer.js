import React from "react";
import axios from "axios";
import styled from "styled-components";
import { A } from "../Elements/Elements";
import MenuItem from "../MenuItem/MenuItem";

class Drawer extends React.Component {
  state = {
    drawer: "closed"
  };

  componentWillReceiveProps(newProps) {
    if (newProps.drawerState !== this.props.drawerState) {
      if (newProps.drawerState === true) {
        this.setState({ drawer: "opening" });

        window.setTimeout(() => {
          this.setState({ drawer: "open" });
        }, 300);
      }

      if (newProps.drawerState === false) {
        this.setState({ drawer: "closing" });

        window.setTimeout(() => {
          this.setState({ drawer: "closed" });
        }, 300);
      }
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const subMenu = e.target.nextSibling; // querySelector("ul");
    const subMenuVisible = subMenu.style.display !== "block" ? false : true;
    if (subMenuVisible) {
      subMenu.style.display = "none";
    } else {
      subMenu.style.display = "block";
    }
    e.target.parentElement.classList.toggle("expanded");
    console.log(window.location.pathname);
  }

  handleSecondaryClick(e) {
    console.log("secondary clicked");
    e.preventDefault();
    e.stopPropagation();
    const subMenu = e.target.nextSibling;
    const parent = e.target.parentElement.parentElement;
    const subMenuVisible = subMenu.style.maxHeight ? true : false;
    if (subMenuVisible) {
      subMenu.style.maxHeight = null;
    } else {
      subMenu.style.maxHeight = subMenu.scrollHeight + "px";
    }
    parent.style.maxHeight = parent.scrollHeight + "px";
  }

  render() {
    return (
      <React.Fragment>
        <Aside className={this.state.drawer}>
          <Nav>
            <ul>
              <Primary>
                <A href="/">TLED Home</A>
              </Primary>

              {this.props.titleBarItems.map(item => {
                // Internal links using React Router
                if (item.type === "post_type") {
                  return (
                    <Tertiary>
                      <A key={item.id} data={item}>
                        {item.title}
                      </A>
                    </Tertiary>
                  );
                }

                // external links
                return (
                  <li>
                    <A key={item.id} href={item.url}>
                      {item.title}
                    </A>
                  </li>
                );
              })}

              {this.props.secondaryNavItems.map((item, index, arr) => {
                if (item.children) {
                  return (
                    <Primary key={item.id}>
                      <A onClick={this.handleClick} data={item}>
                        {item.title}
                      </A>
                      <ul>
                        {item.children.map(child => (
                          <Secondary key={child.id}>
                            <A onClick={this.handleClick} href={child}>
                              {child.title}
                            </A>
                            {child.children && (
                              <ul>
                                {child.children.map(grandchild => (
                                  <Tertiary key={grandchild.id}>
                                    <A data={grandchild}>{grandchild.title}</A>
                                  </Tertiary>
                                ))}
                              </ul>
                            )}
                          </Secondary>
                        ))}
                      </ul>
                    </Primary>
                  );
                }

                // Internal links using React Router
                if (item.type === "post_type") {
                  return (
                    <Primary key={item.id} className="no-children">
                      <A data={item}>{item.title}</A>
                    </Primary>
                  );
                }

                // external links
                return (
                  <li key={item.id}>
                    <A className="parentLink" href={item.url}>
                      {item.title}
                    </A>
                  </li>
                );
              })}
            </ul>
          </Nav>
        </Aside>
        <CloseDrawer
          className={this.state.drawer}
          onClick={this.props.toggleDrawer}
        >
          <span
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              overflow: "hidden"
            }}
          >
            {this.props.drawerState ? "Open" : "Close"} Menu
          </span>
        </CloseDrawer>
      </React.Fragment>
    );
  }
}

// const DrawerContext = React.createContext({
//   drawerState: 'closed',
//   toggleDrawer: () => {
//     console.log('drawer is toggled');
//   }
// });

export { Drawer as default };

const Nav = styled.nav`
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a:hover {
    color: #ccc;
  }
`;

const Primary = styled.li`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  position: relative;

  ul {
    display: none;
  }

  & > a {
    display: inline-block;
    width: calc(100% + 2em);
    padding: 0.2rem 1rem;
    margin-left: -1.1em;
    &:hover {
      border-color: #333;
      background-color: #efefef;
    }
  }

  &.no-children::after {
    height: 0;
    width: 0;
    border: none;
  }

  &::after {
    content: "";
    position: absolute;
    border-color: #666;
    border-style: solid;
    border-width: 0 0.15em 0.15em 0;
    height: 0.75em;
    width: 0.75em;
    top: 0.4em;
    right: 0;
    transform: rotate(45deg);
    transition: all 0.25s ease-out;
  }

  &.expanded::after {
    transform: scaleY(-1) rotate(45deg);
    top: 0.8em;
  }

  .active {
    color: blue;
  }
`;

const Secondary = styled.li`
  font-size: 0.9rem;
  font-weight: normal;
  padding-left: 1em;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    border-color: #666;
    border-style: solid;
    border-width: 0 0.1em 0.1em 0;
    height: 0.65em;
    width: 0.65em;
    top: 0.3em;
    right: 0.075em;
    transform: rotate(45deg);
    transition: all 0.25s ease-out;
  }
  &.expanded::after {
    transform: scaleY(-1) rotate(45deg);
    top: 0.6em;
  }
`;

const Tertiary = styled.li`
  text-transform: none;
  font-size: 0.85rem;
  padding-left: 1em;

  .active {
    color: blue;
  }
`;

const Aside = styled.aside`
  right: 0;
  display: none;
  position: fixed;
  background-color: #fff;
  width: 256px;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  transition: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  padding: 1em;
  box-sizing: border-box;
  transform: translateX(100%);
  will-change: transform;
  overflow-y: scroll;

  &.opening {
    display: flex;
    transform: translateX(100%);
  }

  &.open {
    display: flex;
    transform: translateX(0);
    transition-duration: 0.25s;
  }

  &.closing {
    display: flex;
    transform: translateX(100%);
    transition-duration: 0.25s;
  }
`;

const CloseDrawer = styled.button`
  width: 100%;
  height: 100vh;
  background: #000;
  display: none;
  opacity: 0;
  transition: opacity;
  position: fixed;
  left: 0;
  top: 0;
  will-change: opacity;
  z-index: 998;

  &.opening {
    display: flex;
    opacity: 0;
  }

  &.open {
    display: flex;
    opacity: 0.5;
    transition-duration: 0.25s;
  }

  &.closing {
    display: flex;
    opacity: 0;
    transition-duration: 0.25s;
  }
`;

const ListItem = styled.li`
  margin: 0 0.5rem;

  .parentLink {
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
    @media (min-width: 800px) {
      padding: 1rem;
    }
  }

  .parentLink:hover,
  .parentLink:focus {
    color: white;
    background: #698da4;
  }
`;
