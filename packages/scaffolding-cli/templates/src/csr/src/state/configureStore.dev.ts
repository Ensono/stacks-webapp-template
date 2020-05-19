import {applyMiddleware, createStore, Store, compose} from "redux"
import {ApplicationState, rootReducer, rootSaga} from "./ducks/index"
import sagaMiddleware from "./middlewares/sagas"

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
    const middlewares = applyMiddleware(sagaMiddleware)
    const enhancers = [middlewares]
    const composedEnhancers = composeEnhancers(...enhancers)
    const store = createStore(rootReducer, initialState, composedEnhancers)

    sagaMiddleware.run(rootSaga)

    return store
}
