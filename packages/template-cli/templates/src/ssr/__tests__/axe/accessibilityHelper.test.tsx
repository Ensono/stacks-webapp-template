/**
 * Helper method to test rendered React component(s) against the
 * aXe configuration. Includes automatic cleanup of the rendered component.
 * Failing to do so after calling render could result in a 
 * memory leak with tests which are not idempotent.
 *
 * Input Configuration: .jestAxeSetup.ts for configuration.
 * 
 * Documentation: https://github.com/dequelabs/axe-core/blob/develop-2x/doc/API.md#api-name-axeconfigure
 */

import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'

export function accessibilityTestHelper(testComponent: React.ReactElement) {
	it('passes accessibility checks', async () => {
        const { container } = render(testComponent)
		const results = await axe(container)
		expect(results).toHaveNoViolations()
		cleanup()
	})
}
