/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App_Original from '../App_Original';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App_Original />);
  });
});
