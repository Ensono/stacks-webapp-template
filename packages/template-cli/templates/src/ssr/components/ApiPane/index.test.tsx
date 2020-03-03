import { fireEvent, render, screen, waitForElement } from "@testing-library/react"
import axios from 'axios'
import React from 'react'
import { toMatchDiffSnapshot } from 'snapshot-diff'
import ApiPane from './index'

jest.mock('axios', () =>
  jest.fn(() =>
    Promise.resolve({
      data: {
        results:
          [
            {
              id: 'e98583ad-0feb-4e48-9d4f-b20b09cb2633',
              name: 'Breakfast Menu',
              description: 'Eggs, Bread, Coffee and more',
            },
          ],
      },
    }),
  ),
)
const mockedAxios = axios as jest.Mocked<typeof axios>

test('renders ApiPane snapshot', () => {
  const {asFragment} = render(
      <ApiPane getMenulist={jest.fn()} menuItems={[]} isLoading={false} />,
  )
  expect(asFragment()).toMatchSnapshot()
})

test('fires api call on button click', async () => {
  const {getByText, asFragment} = render(
      <ApiPane getMenulist={jest.fn()} menuItems={[]} isLoading={false} />,
  )
  const firstRender = asFragment()
  
  fireEvent.click(screen.getByTestId('apiPaneBtn'))

  
  await waitForElement(() => screen.getByText('Breakfast Menu'))
  
  const resultNode = await screen.findByTestId('results')
  expect(resultNode).toHaveTextContent('Breakfast Menu')
  expect(mockedAxios).toHaveBeenCalledTimes(1)
  
  // To match re-rendered DOM snapshot after the api response
  expect.extend({toMatchDiffSnapshot})
  expect(firstRender).toMatchDiffSnapshot(asFragment())
})
