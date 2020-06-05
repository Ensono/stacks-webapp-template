import {render} from "@testing-library/react"
import React from "react"
import PostHeader from "."

test("renders ApiPane snapshot", () => {
    const {asFragment} = render(
        <PostHeader
            title=""
            coverImage=""
            date="01 Jan 1970 00:00:00 GMT"
            author=""
        />,
    )
    expect(asFragment()).toMatchSnapshot()
})
