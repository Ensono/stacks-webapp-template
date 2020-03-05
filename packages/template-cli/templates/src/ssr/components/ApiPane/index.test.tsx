import { render, screen, waitForElement } from "@testing-library/react"
import React from "react"
import ApiPane from "./index"
const mockMenuItem = [
    {
        id: "e98583ad-0feb-4e48-9d4f-b20b09cb2633",
        name: "Breakfast Menu",
        description: "Eggs, Bread, Coffee and more",
    },
]

test("renders ApiPane snapshot", () => {
    const {asFragment} = render(<ApiPane menuItems={[]} isLoading={false} />)
    expect(asFragment()).toMatchSnapshot()
})

test("fires api call on mount", async () => {
    const {getByText, asFragment} = render(
        <ApiPane menuItems={mockMenuItem} isLoading={false} />,
    )

    await waitForElement(() => screen.getByText("Breakfast Menu"))

    const resultNode = await screen.findByTestId("results")
    expect(resultNode).toHaveTextContent("Breakfast Menu")
})
