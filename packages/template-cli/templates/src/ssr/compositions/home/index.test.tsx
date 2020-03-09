import "@testing-library/jest-dom/extend-expect"
import React from "react"
import {render} from "@testing-library/react"
import App from "../../pages"
import configureStore from "redux-mock-store"
import sagaMiddleware from "redux-saga"
import {Provider} from "react-redux"

const mockStore = configureStore([sagaMiddleware])
const initialState = {
  getMenus: {
    loading: false,
    error: null,
    menuItems: [],
  }
}

// const indexPageText = `Welcome to Stacks-react app! your current environment is: ${process.env.NODE_ENV}`


// test("With React Testing Library page renders tag type <div> with text", () => {
//     // Initialize mockstore with empty state
//     const store = mockStore(initialState)
//     const {getByText} = render(
//         <Provider store={store}>
//             <App />
//         </Provider>,
//     )

//     expect(getByText(indexPageText)).not.toBeNull()
// })

test("With React Testing Library Snapshot renders page", () => {
  const store = mockStore(initialState)
    const {asFragment} = render(
        <Provider store={store}>
            <App />
        </Provider>,
    )

    expect(asFragment()).toMatchSnapshot()
})

// test("With React Testing Library page rerenders with hydrate", () => {
//   const store = mockStore(initialState)
//     const {getByText, rerender} = render(
//         <Provider store={store}>
//             <App />
//         </Provider>,
//     )
//     expect(getByText(indexPageText)).not.toBeNull()

//     // Rerender: Calls render again passing in the original arguments and sets hydrate to true.
//     rerender(
//         <Provider store={store}>
//             <App />
//         </Provider>,
//     )
//     expect(getByText(indexPageText)).not.toBeNull()
// })
