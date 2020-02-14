import * as React from 'react'
import {render} from '@testing-library/react'
import ApiPane from '../../../components/ApiPane'

test('renders ApiPane snapshot', () => {
    const {asFragment} = render(<ApiPane />)
    expect(asFragment()).toMatchSnapshot()
});