import React from "react"
import CreateForm from "."
import configureStore from "redux-mock-store"
import sagaMiddleware from "redux-saga"
import {Provider} from "react-redux"
import {accessibilityTestHelper} from "../../__tests__/axe/accessibilityHelper.test"

const mockStore = configureStore([sagaMiddleware])
const initial_value = {
    addMenu: {
        isLoading: false,
        error: "",
        addMenuItem: jest.fn(),
        menuId: "",
        added: false,
    },
}
const store = mockStore(initial_value)
accessibilityTestHelper(
    <Provider store={store}>
        <CreateForm {...initial_value} />
    </Provider>,
)
