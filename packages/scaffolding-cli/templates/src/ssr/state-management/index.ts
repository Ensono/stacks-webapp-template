import {Store, createStore, applyMiddleware, compose} from "redux"
import createSagaMiddleware, {Task} from "redux-saga"
import getConfig from "next/config"
import rootReducer from "./root-reducer"
import rootSaga from "./root-saga"
import logger from "redux-logger"

const IS_BROWSER = typeof window !== "undefined"

const {
    publicRuntimeConfig: {NODE_ENV},
} = getConfig()

const hasDevTools =
    NODE_ENV === "development" && IS_BROWSER && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancers = hasDevTools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

interface WithSagaTaskStore extends Store {
    sagaTask?: Task
}

const configureStore = (preloadedState: any = {}) => {
    const sagaMiddleware = createSagaMiddleware()

    const middlewares = [sagaMiddleware, logger]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeEnhancers(...enhancers)

    const store: WithSagaTaskStore = createStore(
        rootReducer,
        preloadedState,
        composedEnhancers,
    )

    /**
     * next-redux-saga depends on `sagaTask` being attached to the store.
     * It is used to await the rootSaga task before sending results to the client.
     */

    store.sagaTask = sagaMiddleware.run(rootSaga)

    return store
}

export default configureStore
