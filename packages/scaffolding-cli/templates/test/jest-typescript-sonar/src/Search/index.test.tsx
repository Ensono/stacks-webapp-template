import {render} from "@testing-library/react"
import React from "react"
import {Search} from "."

test("renders ApiPane snapshot", () => {
    const { asFragment } = render(<Search />)
    expect(asFragment).toMatchSnapshot()
})
