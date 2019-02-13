import React from 'react';
import { render } from 'react-testing-library'

import Parser from './Parser';

const wordpressURL = "https://instruction.austincc.edu/tled/copyright/";
const fileURL = "https://instruction.austincc.edu/tled/wp-content/uploads/sites/3/2019/02/mar2copyright1.pdf";
const externalURL = "https://google.com";


const exampleHTML = `
<div>
  <h1>Working Title</h1>
  <a href="${wordpressURL}">Copyright Page</a>
  <a href="${fileURL}">File</a>
  <a href="${externalURL}">Google</a>
</div>
`;

test('Parses html and converts Wordpress links to relative links except for files', () => {

  const { getByText } = render(<Parser>{exampleHTML}</Parser>);

  expect(getByText('Working Title')).toBeTruthy();
  expect(getByText("Copyright Page")).toHaveAttribute('href', '/copyright/');
  expect(getByText("File")).toHaveAttribute('href', fileURL);
  expect(getByText("Google")).toHaveAttribute('href', externalURL);
});
