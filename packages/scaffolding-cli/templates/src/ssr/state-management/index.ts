import {createWrapper} from "next-redux-wrapper"
import {applyMiddleware, createStore, Store} from "redux"
import logger from "redux-logger"
import createSagaMiddleware, {Task} from "redux-saga"
import rootReducer from "./root-reducer"
import rootSaga from "./root-saga"

export interface WithSagaTaskStore extends Store {
    sagaTask?: Task
}

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== "production") {
        const {composeWithDevTools} = require("redux-devtools-extension")
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const configureStore = preloadedState => {
    const sagaMiddleware = createSagaMiddleware()

    const composedEnhancers = bindMiddleware([sagaMiddleware, logger])

    const store: WithSagaTaskStore = createStore(rootReducer, composedEnhancers)

    store.sagaTask = sagaMiddleware.run(rootSaga)

    return store
}

export const wrapper = createWrapper(configureStore, {debug: true})
