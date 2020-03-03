import React from 'react'
import ApiPane from './index'
import { accessibilityTestHelper } from '../../axe/accessibilityTestHelper'

accessibilityTestHelper(
    <ApiPane
        getMenulist={jest.fn()}
        menuItems={[]}
        isLoading={false}
    />,
)
