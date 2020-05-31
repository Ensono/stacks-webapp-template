import {createWrapper} from "next-redux-wrapper"
import {applyMiddleware, createStore, Store} from "redux"
import logger from "redux-logger"
import createSagaMiddleware, {Task} from "redux-saga"
import rootReducer from "./root-reducer"
import rootSaga from "./root-saga"

// const IS_BROWSER = typeof window !== "undefined"

// const {
//     publicRuntimeConfig: {NODE_ENV},
// } = getConfig()

// const hasDevTools = false
// NODE_ENV === "development" && IS_BROWSER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

// const composeEnhancers = hasDevTools
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : compose

interface WithSagaTaskStore extends Store {
    sagaTask?: Task
}

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== "production") {
        const {composeWithDevTools} = require("redux-devtools-extension")
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const configureStore = (preloadedState: any = {}) => {
    const sagaMiddleware = createSagaMiddleware()

    // const middlewares = [sagaMiddleware, logger]
    // const middlewareEnhancer = applyMiddleware(...middlewares)

    // const enhancers = [middlewareEnhancer]
    const composedEnhancers = bindMiddleware([sagaMiddleware, logger])

    const store: WithSagaTaskStore = createStore(
        rootReducer,
        preloadedState,
        composedEnhancers,
    )

    store.sagaTask = sagaMiddleware.run(rootSaga)

    return store
}

export const wrapper = createWrapper(configureStore, {debug: true})
