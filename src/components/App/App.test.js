import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('../TitleBar/TitleBar', () => 'title-bar');
jest.mock('../SecondaryNav/SecondaryNav', () => 'secondary-nav');
jest.mock('../Footer/Footer.js', () => 'footer');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('toggleSearch works', () => { });
test('searchSubmitted works', () => { });
test('toggleSubMenu works', () => { });
test('cancelSubMenuState works', () => { });