import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import ApiPane from '../../../components/ApiPane';

test('renders ApiPane snapshot', () => {
    const {asFragment} = render(<ApiPane />)
    expect(asFragment()).toMatchSnapshot()
});

test('fires api call on button click', () => {
    const { getByText } = render(<ApiPane />)
    expect(getByText('get')).toBeInTheDocument()
    fireEvent.click(getByText('get'));
})