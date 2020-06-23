import {render, act} from "@testing-library/react"
import React from "react"
import {LocaleSwitcher} from "."

test("renders LocaleSwitcher snapshot", async () => {
    let renderedComp
    await act(async () => {
        renderedComp = render(<LocaleSwitcher />)
    })
    expect(renderedComp.asFragment()).toMatchSnapshot()
})
