import {render} from "@testing-library/react"
import React from "react"
import CoverImage from "."

test("renders ApiPane snapshot", () => {
    const {asFragment} = render(<CoverImage title="" url="" slug="" />)
    expect(asFragment()).toMatchSnapshot()
})
