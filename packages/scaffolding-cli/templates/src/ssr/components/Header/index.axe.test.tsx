import React from "react"
import {Header} from "."
import {accessibilityTestHelper} from "../../__tests__/axe/accessibilityHelper.test"
// Mocks useRouter
const useRouter = jest.spyOn(require("next/router"), "useRouter")
jest.mock("../../lib/hooks", () => ({
    useUser: jest.fn().mockReturnValue({
        displayName: "",
        picture: "",
    }),
}))
export const mockNextUseRouter = (props: {
    route: string
    pathname: string
    query: string
    asPath: string
}) => {
    useRouter.mockImplementationOnce(() => ({
        route: props.route,
        pathname: props.pathname,
        query: props.query,
        asPath: props.asPath,
    }))
}
accessibilityTestHelper(<Header />)

// Without create button
mockNextUseRouter({
    route: "/create",
    pathname: "/create",
    query: "",
    asPath: "",
})
accessibilityTestHelper(<Header />)
