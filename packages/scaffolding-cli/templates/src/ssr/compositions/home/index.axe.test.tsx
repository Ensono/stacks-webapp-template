/*
We expect every component to pass our accessibility checks. By using jest-axe we get fast feedback whilst developing.

⚠️ IMPORTANT:
    Note that this will render the component, without notion of the document as a whole.
    To test the end user result with the components rendered in Page by Next, please
    use Cypress with Axe.
    Example: index.test.axe.cy.ts
*/

import * as React from "react"
import Home from "."
import configureStore from "redux-mock-store"
import sagaMiddleware from "redux-saga"
import {Provider} from "react-redux"
import {accessibilityTestHelper} from "../../__tests__/axe/accessibilityHelper.test"

const mockStore = configureStore([sagaMiddleware])
const initialState = {
    getMenus: {
        loading: false,
        error: null,
        menuItems: [],
    },
}
const store = mockStore(initialState)
accessibilityTestHelper(
    <Provider store={store}>
        <Home />
    </Provider>,
)
