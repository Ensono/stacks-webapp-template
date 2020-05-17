/* eslint-disable */
import {combineReducers} from "redux"
import {all, fork} from "redux-saga/effects"
import {Action, PayloadAction, TypeConstant} from "typesafe-actions"
import {MenuState} from "../../interfaces/sagas.interface"
import {postReducer} from "./get-menus/reducers"
import postSaga from "./get-menus/sagas"
// The top-level state object
export interface ApplicationState {
    post: MenuState
}

export interface ReducerAction<TPayload>
    extends Action<TypeConstant>,
        PayloadAction<TypeConstant, TPayload> {}

export const rootReducer = combineReducers<ApplicationState>({
    post: postReducer,
})

export function* rootSaga() {
    yield all([fork(postSaga)])
}
