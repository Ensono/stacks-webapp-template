/**
 * Rather than importing the extend-expect‘s per test
 * if put in the Jest-specific setupTests these are
 * imported automatically before every test.
 *
 * Configure the rules are run against the document under
 * test.
 *
 * At a minimum, we expect our web apps to adhere to
 * accessibility standard WCAG 2.0 Level AA.
 *
 * Documentation: https://github.com/dequelabs/axe-core/blob/develop-2x/doc/API.md#api-name-axeconfigure
 */
import { configureAxe, toHaveNoViolations, JestAxe } from './node_modules/jest-axe';

JestAxe.expect.extend(toHaveNoViolations)

export const jestAxeConfig: JestAxe = configureAxe({
    rules: ["wcag2aa"]
})
