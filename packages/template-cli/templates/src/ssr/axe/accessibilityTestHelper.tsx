import * as React from 'react'
import { render, cleanup } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations);

// Using the config in .jestAxeSetup.ts checks very minimally that the component meets the standards
//Failing to call cleanup when you've called render could result in a memory leak and tests which are not "idempotent"
export function accessibilityTestHelper(testComponent: React.ReactElement) {
	it('passes accessibility checks', async () => {
        const { container } = render(testComponent);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
		cleanup();
	})
}
