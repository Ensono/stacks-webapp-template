import React from 'react'
import Home from '.'
// import { accessibilityTestHelper } from '../../axe/accessibilityTestHelper'
import configureStore from "redux-mock-store"
import sagaMiddleware from "redux-saga"
import {Provider} from "react-redux"
import { accessibilityTestHelper } from '../../__tests__/axe/accessibilityHelper.test'

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
    </Provider>
)
