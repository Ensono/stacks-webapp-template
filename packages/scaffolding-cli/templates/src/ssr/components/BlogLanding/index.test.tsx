import { render } from "@testing-library/react"
import React from "react"
import { BlogLanding } from "."

test("renders BlogLanding snapshot", () => {
    const {asFragment} = render(<BlogLanding posts="" />)
    expect(asFragment()).toMatchSnapshot()
})
