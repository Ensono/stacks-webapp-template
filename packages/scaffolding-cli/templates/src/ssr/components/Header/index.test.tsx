import {render} from "@testing-library/react"
import React from "react"
import {Header} from "."

const useRouter = jest.spyOn(require("next/router"), "useRouter")

const mockNextUseRouter = (props: {
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

test("renders Header snapshot", () => {
    const {asFragment, getByTestId} = render(<Header />)
    expect(asFragment()).toMatchSnapshot()
    expect(getByTestId("create_button")).toBeInTheDocument()
})

test("renders no button on create page", () => {
    mockNextUseRouter({
        route: "/create",
        pathname: "/create",
        query: "",
        asPath: "",
    })
    const {asFragment, queryByTestId} = render(<Header />)
    expect(asFragment()).toMatchSnapshot()
    expect(queryByTestId("create_button")).toBeNull()
})
