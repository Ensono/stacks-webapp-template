import {render} from "@testing-library/react"
import React from "react"
import App from "./App"

jest.mock("./utility/telemetry.ts")

test("With React Testing Library page renders tag type <App> with text", () => {
    const {getByText} = render(<App />)
    const headerText = getByText(/project_name/i)
    expect(headerText.tagName.toLowerCase()).toBe("h2")
})
