import {render} from "@testing-library/react"
import React from "react"
import {LocaleSwitcher} from "."

test("renders ApiPane snapshot", () => {
    const {asFragment} = render(<LocaleSwitcher />)
    expect(asFragment()).toMatchSnapshot()
})
