import React from 'react';
import { render, waitForElement } from 'react-testing-library'
import { BrowserRouter as Router } from 'react-router-dom';

import TitleBar from './TitleBar';

import axios from 'axios';
jest.mock('axios');

test('get a list of titlebar nav items from WordPress', async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      items: [{
        id: 1,
        title: 'Item One',
        slug: 'item-one',
      },
      {
        id: 2,
        title: 'Item Two',
        slug: 'item-two',
      },
      {
        id: 3,
        title: 'Item Three',
        slug: 'item-three',
      }]
    }
  });

  const { getByText } = render(<Router><TitleBar /></Router>);

  // wait for the async get request to finish
  const itemOne = await waitForElement(() => getByText('Item One'));

  expect(getByText('Item One')).toBeTruthy();
  expect(getByText('Item Two')).toBeTruthy();
  expect(getByText('Item Three')).toBeTruthy();
  expect(axios.get).toHaveBeenCalledTimes(1);
});