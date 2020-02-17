import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import { toMatchDiffSnapshot } from 'snapshot-diff'
import ApiPane from '../../../components/ApiPane'

test('renders ApiPane snapshot', () => {
  const {asFragment} = render(<ApiPane />)
  expect(asFragment()).toMatchSnapshot()
})

test('ApiPane fires api call on button click', async () => {
  const {getByText,asFragment} = render(<ApiPane />)
  const firstRender = asFragment()
  // find button
  expect(getByText('get')).toBeInTheDocument()
  fireEvent.click(getByText('get'))
  expect.extend({toMatchDiffSnapshot})
  expect(firstRender).toMatchDiffSnapshot(asFragment())
})
