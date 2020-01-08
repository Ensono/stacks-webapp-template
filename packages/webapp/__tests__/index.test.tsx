import * as React from 'react';
import {render} from "@testing-library/react"
import App from "../pages/index"

test('Renders a page of tag type <div> with text', () => {
  const { getByText } = render(<App />);

  expect(getByText('Welcome to Stacks-react app!')).not.toBeNull();
});
