import {render} from "@testing-library/react"
import React from "react"
import {BlogLanding} from "."

test("renders ApiPane snapshot", () => {
    const {asFragment} = render(<BlogLanding posts="" />)
    expect(asFragment()).toMatchSnapshot()
})
