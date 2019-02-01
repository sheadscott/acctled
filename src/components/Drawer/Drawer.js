import React from "react";
import styled from "styled-components";
import { A } from "../Elements/Elements";

// Import arrow
import { ReactComponent as DownArrowIcon } from "../../img/arrowDown.svg";

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
    e.target.querySelector("svg").classList.toggle("expanded");
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
                    <Tertiary className="home-links" key={item.id}>
                      <A key={item.id} data={item}>
                        {item.title}
                      </A>
                    </Tertiary>
                  );
                }

                // external links
                return (
                  <li key={item.id}>
                    <A href={item.url}>
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
                        <ArrowIcon />
                      </A>
                      <ul>
                        {item.children.map(child => (
                          <Secondary key={child.id}>
                            <A onClick={this.handleClick} href={child}>
                              {child.title}
                              <ArrowIcon className="secondary" />
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
    fill: #ccc;
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
    width: calc(100% + 1.1em);
    padding-left: 0.4em;

    &:hover {
      background-color: #efefef;
    }
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
`;

const Tertiary = styled.li`
  text-transform: none;
  font-size: 0.85rem;
  padding-left: 1em;

  .active {
    color: blue;
  }

  &.home-links {
    padding-left: 1em;
  }
`;

const ArrowIcon = styled(DownArrowIcon)`
  position: absolute;
  top: 0;
  right: -1em;
  width: 2em;
  transition: transform 0.3s ease-out;

  &.secondary {
    width: 1.3em;
    right: -0.7em;
  }

  &.expanded {
    transform: scaleY(-1);
  }
`;

const Aside = styled.aside`
  right: 0;
  display: none;
  position: fixed;
  background-color: #fff;
  width: 275px;
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
