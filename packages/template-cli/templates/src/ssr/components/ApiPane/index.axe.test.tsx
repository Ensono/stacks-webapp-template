import React from 'react'
import ApiPane from '.'
import { accessibilityTestHelper } from '../../__tests__/axe/accessibilityHelper.test'

accessibilityTestHelper(
    <ApiPane
        getMenulist={jest.fn()}
        menuItems={[]}
        isLoading={false}
    />,
)
