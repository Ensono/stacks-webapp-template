/* eslint-disable */
import {combineReducers} from "redux"
import {all, fork} from "redux-saga/effects"
import {Action, MetaAction, PayloadAction, TypeConstant} from "typesafe-actions"
import {postReducer} from "./get-menus/reducers"
import postSaga from "./get-menus/sagas"
import {IPostState} from "./get-menus/types"
// The top-level state object
export interface ApplicationState {
    post: IPostState
}

export interface IMetaAction extends MetaAction<TypeConstant, Meta> {}
export interface ReducerAction<TPayload>
    extends Action<TypeConstant>,
        PayloadAction<TypeConstant, TPayload> {}
export const rootReducer = combineReducers<ApplicationState>({
    post: postReducer,
})
export function* rootSaga() {
    yield all([fork(postSaga)])
}
interface Meta {
    method: string
    route: string
}
