import {render} from "@testing-library/react"
import React from "react"
import HeroPost from "."

test("renders HeroPost snapshot", () => {
    const {asFragment} = render(
        <HeroPost
            title=""
            coverImage=""
            date="01 Jan 1970 00:00:00 GMT"
            author=""
            excerpt=""
            slug=""
        />,
    )
    expect(asFragment()).toMatchSnapshot()
})
