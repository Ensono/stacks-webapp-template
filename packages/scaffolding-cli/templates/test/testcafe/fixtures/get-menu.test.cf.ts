/*
* For selectors see the documentation on TestCafe: https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors/

* Document: https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html

To introduce a test, call the test function and pass the test code inside it.

test( testName, fn(t) ): 
- fn	Function: An asynchronous function that contains the test code.
- t	Object: The test controller used to access the test run API.

*/

import {Selector} from "testcafe"
import {deleteMenu, addMenu} from "../api/menu"
import {getAppUrl} from "../environment-variables"

const url = getAppUrl().APP_URL
console.log(`Current url: ${url}`)

fixture`home`.page`${url}`

const menuList = Selector("[data-testid=results]")

const testMenuName = "Automated Yumido Menu"

test
    .before(async (t: any) => {
        t.ctx.menuId = await addMenu(testMenuName)
        console.log(`Created menuId: ${t.ctx.menuId}`)
    })
    ("Returns the Latest menus component", async t => {
        await t
            .expect(menuList.exists)
            .ok()
    })
    .after(async (t: any) => {
        const response = await deleteMenu(t.ctx.menuId)
        console.log(`deleteMenu response: ${response}`)
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

    // Saves the result in the test context so we can clean up the data after
    t.ctx.menuId = (await snackBarMessage).split(" ", 1)
}).after(async (t: any) => {
    const response = await deleteMenu(t.ctx.menuId)
    console.log(`deleteMenu response: ${response}`)
})
