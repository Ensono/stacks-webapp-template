import {render} from "@testing-library/react"
import React from "react"
import PostBody from "."

test("renders ApiPane snapshot", () => {
    const {asFragment} = render(<PostBody content="" />)
    expect(asFragment()).toMatchSnapshot()
})
