import {applyMiddleware, createStore, Store} from "redux"
import {ApplicationState, rootReducer, rootSaga} from "./ducks/index"
import sagaMiddleware from "./middlewares/sagas"

export default function configureStore(
    initialState: ApplicationState,
): Store<ApplicationState> {
    const middlewares = applyMiddleware(sagaMiddleware) // Create Store
    const store = createStore(rootReducer, initialState, middlewares)

    sagaMiddleware.run(rootSaga)

    return store
}
