/*
* 
* Document: https://devexpress.github.io/testcafe/documentation/test-api/test-code-structure.html
*/

import {Selector} from "testcafe"

fixture`home`.page
`http://dev.amidostacks.com/web/stacks` 

//Todo: refactor this, bad practice with using text, but it's an example
test("Returns the Latest menus component", async t => {
    await t
        .expect(Selector("h1").innerText).eql("Latest menus:")
})
