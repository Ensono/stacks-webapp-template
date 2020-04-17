import {createRoutine} from "redux-saga-routines"
import {call, put, takeEvery} from "redux-saga/effects"
import {getMenus} from "../../services"

export const requestMenusListRoutine = createRoutine("MENU")

export const initialState = {
    loading: false,
    error: null,
    menuItems: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case requestMenusListRoutine.TRIGGER:
            return {
                ...initialState,
                ...action.payload,
            }
        case requestMenusListRoutine.REQUEST:
            return {
                ...state,
                ...action.payload,
                loading: true,
            }
        case requestMenusListRoutine.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case requestMenusListRoutine.SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuItems: action.payload.results,
            }
        default:
            return state
    }
}

export function* requestMenuList({payload}) {
    yield put(requestMenusListRoutine.request())
    try {
        const response = yield call(getMenus, payload.searchTerm)
        yield put(requestMenusListRoutine.success(response))
    } catch (error) {
        yield put(requestMenusListRoutine.failure(error))
    }
}

export function* watchRequestGetMenu() {
    yield takeEvery(requestMenusListRoutine.TRIGGER, requestMenuList)
}

export const isLoading = state => state.getMenus.loading

export const getError = state => state.getMenus.error

export const getMenuItems = state => state.getMenus.menuItems

export const getMenuSagas = [watchRequestGetMenu]

export default reducer
