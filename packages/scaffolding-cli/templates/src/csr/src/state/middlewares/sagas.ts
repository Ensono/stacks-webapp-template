import createSagaMiddleware, {Task} from "redux-saga"
import {Store} from "redux"
// Redux-saga middleware
const sagaMiddleware = createSagaMiddleware()

export interface WithSagaTaskStore extends Store {
    sagaTask?: Task
}

export default sagaMiddleware
