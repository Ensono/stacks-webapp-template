import {render, screen, waitForElement} from "@testing-library/react"
import React from "react"
import CreateForm from "."
import {Provider} from "react-redux"
import sagaMiddleware from "redux-saga"
import configureStore from "redux-mock-store"

const mockStore = configureStore([sagaMiddleware])
const initialState = {
    addMenu: {
        isLoading: false,
        error: "",
        menuId: "",
        added: false,
    },
    values: {
        menu_name: "",
        description: "",
        enabled: false,
    },
}

test("renders form snapshot", () => {
    const store = mockStore(initialState)
    const {getByText, asFragment} = render(
        <Provider store={store}>
            <CreateForm />
        </Provider>,
    )
    expect(asFragment()).toMatchSnapshot()
    expect(getByText("Save")).toBeDisabled()
})
