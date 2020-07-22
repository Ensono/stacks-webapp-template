/* eslint-disable jest/expect-expect */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/*
* For selectors see the documentation on TestCafe: https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors/

* Document: https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html

To introduce a test, call the test function and pass the test code inside it.

test( testName, fn(t) ): 
- fn	Function: An asynchronous function that contains the test code.
- t	Object: The test controller used to access the test run API.

*/

import {Selector} from "testcafe"
import {deleteMenu, addMenu, getMenus} from "../api/menu"
import {getAppUrl} from "../environment-variables"

const url = getAppUrl().APP_URL
console.log(`Current url: ${url}`)

const menuList = Selector("[data-testid=results]")
const testMenuName = "Automated Yumido Menu"

fixture`home`.page`${url}`
    .before(async ctx => {
        // Inject a single menu to ensure data exists
        ctx.menuId = await addMenu("First Menu")
        console.log(`Created menuId: ${ctx.menuId}`)
    })
    .beforeEach(async t => {
        // Delete all test menus
        const menus = await getMenus(testMenuName)
        menus.map(menu => {
            return deleteMenu(menu.id)
        })
    })
    .after(async ctx => {
        // Remove injected menu
        const response = await deleteMenu(ctx.menuId)
        console.log(`deleteMenu response: ${response}`)
    })

test("Returns the Latest menus component", async t => {
    await t.expect(menuList.exists).ok()
})

test("Create a new Yumido menu", async t => {
    const createMenu = Selector("[data-testid='create_button']")
    const menuName = Selector("#name")
    const menuDesc = Selector("#description")
    const menuActive = Selector("[name='enabled']")
    const saveMenu = Selector(":nth-child(2) > .MuiButtonBase-root")
    const snackBarMessage = Selector("#snackbar-message-id").innerText

    await t
        .expect(menuList.innerText)
        .notContains(testMenuName)
        .click(createMenu)
        .expect(menuName.exists)
        .ok()
        .typeText(menuName, testMenuName)
        .typeText(menuDesc, "A delicous array of funky FE flavours")
        .click(menuActive)
        .click(saveMenu)
        .expect(snackBarMessage)
        .contains("menu created")
})
