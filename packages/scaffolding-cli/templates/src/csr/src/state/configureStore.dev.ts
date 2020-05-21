import {applyMiddleware, compose, createStore, Store} from "redux"
import logger from "redux-logger"
import {ApplicationState, rootReducer, rootSaga} from "./ducks/index"
import sagaMiddleware, {WithSagaTaskStore} from "./middlewares/sagas"

const hasDevTools =
    process.env.NODE_ENV === "development" &&
    // eslint-disable-next-line
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancers = hasDevTools
    ? // eslint-disable-next-line
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

export default function configureStore(
    initialState: ApplicationState,
): Store<ApplicationState> {
    const middlewares = applyMiddleware(logger, sagaMiddleware)
    const enhancers = [middlewares]
    const composedEnhancers = composeEnhancers(...enhancers)
    const store: WithSagaTaskStore = createStore(
        rootReducer,
        initialState,
        composedEnhancers,
    )

    sagaMiddleware.run(rootSaga)

    return store
}
