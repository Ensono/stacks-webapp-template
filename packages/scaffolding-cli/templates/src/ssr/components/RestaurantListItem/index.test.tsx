import React from 'react';
import RestaurantListItem from '.';
import { fireEvent, render, screen, waitForElement } from "@testing-library/react"
import { toMatchDiffSnapshot } from 'snapshot-diff'

describe('The <RestaurantListItem/>', () => {
  it('should match snapshot', () => {
    const wrapper = render(<RestaurantListItem restaurant={
      {
        id: "a",
        restaurandId: "b",
        name: "c",
        description: "d",
        enabled: true
      }
    } />);
    expect(wrapper).toMatchSnapshot();
  })

  describe('When ', () => {

  });
});
