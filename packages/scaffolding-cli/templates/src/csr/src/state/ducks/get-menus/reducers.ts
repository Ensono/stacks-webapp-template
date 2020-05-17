import {Action, PayloadAction, TypeConstant} from "typesafe-actions"
/*  eslint import/no-cycle: [2, { maxDepth: 1 }]  */
import {
    MenuItem,
    MenuState,
    GetMenuActionTypes,
} from "../../../interfaces/sagas.interface"

export const initialState: MenuState = {
    data: [],
    errors: "",
    loading: false,
}
export const postReducer = (
    state: MenuState = initialState,
    // eslint-disable-next-line
    action: any,
): MenuState => {
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
                errors: action.error,
                loading: false,
            }
        }
        default:
            return state
    }
}
