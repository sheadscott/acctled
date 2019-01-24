import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { A } from '../Elements/Elements';


class Drawer extends React.Component {
  state = {
    drawer: 'closed',
    titleBarItems: [],
    secondaryNavItems: []
  }

  componentDidMount() {
    axios
      .get(
        "https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/3"
      )
      .then(response => {
        const titleBarItems = response.data.items;
        // console.log("titlebar items", titleBarItems);
        this.setState({ titleBarItems });
      });

    axios.get('https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/4').then(response => {
      this.setState({
        secondaryNavItems: response.data.items,
      })
    });
  }

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

  render() {
    return (
      <React.Fragment>
        <Aside className={this.state.drawer}>
          <nav>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              <li>
                <A href="/">TLED Home</A>
              </li>

              {this.state.titleBarItems.map(item => {
                // Internal links using React Router
                if (item.type === "post_type") {
                  return (
                    <li key={item.id}><A data={item}>
                      {item.title}
                    </A></li>
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

              {this.state.secondaryNavItems.map((item, index, arr) => {

                if (item.children) {
                  return (
                    <li key={item.id}>
                      {item.title}
                      <ul style={{ marginBottom: '1.5rem' }}>
                        {item.children.map(child => <li key={child.id}><A data={child}>{child.title}</A></li>)}
                      </ul>
                    </li>
                  )
                }

                // Internal links using React Router
                if (item.type === "post_type") {
                  return <li key={item.id}><A className="parentLink" data={item}>{item.title}</A></li>
                }

                // external links
                return <li key={item.id}><A className="parentLink" href={item.url}>{item.title}</A></li>
              })}

            </ul>
          </nav>
        </Aside>
        <CloseDrawer className={this.state.drawer} onClick={this.props.toggleDrawer}>
          <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>{this.props.drawerState ? 'Open' : 'Close'} Menu</span>
        </CloseDrawer>
      </React.Fragment>
    )
  }
}

// const DrawerContext = React.createContext({
//   drawerState: 'closed',
//   toggleDrawer: () => {
//     console.log('drawer is toggled');
//   }
// });

export {
  Drawer as default
}

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
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  z-index: 999;
  padding: 2rem;
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
    transition-duration: .25s;
  }

  &.closing {
    display: flex;
    transform: translateX(100%);
    transition-duration: .25s
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
    transition-duration: .25s;
  }

  &.closing {
    display: flex;
    opacity: 0;
    transition-duration: .25s
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
      padding: 1rem
    }
  }

  .parentLink:hover,
  .parentLink:focus {
    color: white;
    background: #698da4;
  }
`;