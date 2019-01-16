import React from 'react';
import styled from 'styled-components';


class Drawer extends React.Component {
  state = {
    drawer: 'closed'
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
        <Aside className={this.state.drawer}>Drawer Menu</Aside>
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
  width: 256px;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  transition: transform;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  overflow: hidden;
  z-index: 999;
  padding: 1rem;
  box-sizing: border-box;
  transform: translateX(100%);
  will-change: transform;


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
