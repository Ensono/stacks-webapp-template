
import * as React from 'react'
import { axe } from 'jest-axe'
import ApiPane from '.'
import { renderToString } from 'react-dom/server'

test('renders ApiPane snapshot', async () => {
  const html = renderToString(<ApiPane />)
  const results = await axe(html)

  expect(results).toHaveNoViolations()
})

