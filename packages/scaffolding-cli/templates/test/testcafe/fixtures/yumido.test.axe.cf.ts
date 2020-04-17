/*
 * Example implementation of accessibility testing a deployed webpage with aXe
 */

import {axeCheck, createReport} from "axe-testcafe"
import {Selector} from "testcafe"
import {getAppUrl} from "../environment-variables"

const url = getAppUrl().APP_URL
console.log(`Current url: ${url}`)

fixture`Home page with aXe`.page`${url}`

const menuList = Selector("[data-testid=results]")
test("Automated accessibility testing with aXe", async t => {
    const {error, violations} = await axeCheck(t)
    await t.expect(violations.length === 0).ok(createReport(violations))
})
