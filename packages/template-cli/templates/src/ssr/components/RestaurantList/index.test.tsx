import React from 'react';
import RestaurantListComponent from '.';
import { fireEvent, render, screen, waitForElement } from "@testing-library/react"
import { toMatchDiffSnapshot } from 'snapshot-diff'


test('renders RestaurantListComponent snapshot without restaurants', () => {
  const wrapper = render(<RestaurantListComponent restaurantList={[]} />);
  expect(wrapper).toMatchSnapshot();
});

test('renders RestaurantListComponent snapshot with restaurants', () => {
  const wrapper = render(<RestaurantListComponent
    restaurantList={[{
      id: '1',
      restaurandId: 'b',
      name: 'c',
      description: 'd',
      enabled: true
    },
    {
      id: '2',
      restaurandId: 'b',
      name: 'c',
      description: 'd',
      enabled: true
    }]} />);
  expect(wrapper).toMatchSnapshot();
});