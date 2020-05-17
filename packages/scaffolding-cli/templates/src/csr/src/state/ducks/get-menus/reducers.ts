import {Action, PayloadAction, TypeConstant} from "typesafe-actions"
/*  eslint import/no-cycle: [2, { maxDepth: 1 }]  */
import {IPostRaw, IPostState, GetMenuActionTypes} from "./types"

export const initialState: IPostState = {
    data: [],
    errors: [],
    loading: false,
}
export const postReducer = (
    state: IPostState = initialState,
    action: Action<TypeConstant> & PayloadAction<TypeConstant, IPostRaw[]>,
): IPostState => {
    switch (action.type) {
        case GetMenuActionTypes.FETCH_POSTS: {
            return {...state, loading: true}
        }
        case GetMenuActionTypes.FETCH_POSTS_SUCCESS: {
            return {...initialState, data: action.payload}
        }
        case GetMenuActionTypes.FETCH_POSTS_ERROR: {
            return {
                ...state,
            }
        }
        default:
            return state
    }
}
