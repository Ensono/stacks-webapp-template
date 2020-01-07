import * as React from 'react';
import {render} from "@testing-library/react"
import App from "../pages/index"

test('renders a page of tag div with text', () => {
  const { getByText } = render(<App />);

  expect(getByText('Welcome to Stacks-react app!')).not.toBeNull();
});
