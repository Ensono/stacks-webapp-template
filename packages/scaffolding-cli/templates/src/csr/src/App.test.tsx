import {render} from "@testing-library/react"
import React from "react"
import App from "./App"

test("With React Testing Library page renders tag type <App> with text", () => {
    const {getByText} = render(<App />)
    const headerText = getByText(/projectName/i)
    console.log(`headerTest ${headerText.innerText}`)
    expect(headerText.tagName.toLowerCase()).toBe("h2")
})
