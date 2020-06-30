import {
    GetMenuActionTypes,
    MenuState,
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
