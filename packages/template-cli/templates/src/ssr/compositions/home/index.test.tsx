import '@testing-library/jest-dom/extend-expect'
import * as React from 'react';
import { render } from '@testing-library/react';
import App from '../../pages';

const indexPageText = `Welcome to Stacks-react app! your current environment is: ${process.env.NODE_ENV}`;

test('With React Testing Library page renders tag type <div> with text', () => {
  const { getByText } = render(<App />);

  expect(getByText(indexPageText)).not.toBeNull();
});

test('With React Testing Library Snapshot renders page', () => {
  const { asFragment } = render(<App />);

  expect(asFragment()).toMatchSnapshot();
});

test('With React Testing Library page rerenders with hydrate', () => {
  const { getByText, rerender } = render(<App />);
  expect(getByText(indexPageText)).not.toBeNull();

  // Rerender: Calls render again passing in the original arguments and sets hydrate to true.
  rerender(<App />);
  expect(getByText(indexPageText)).not.toBeNull();
});
