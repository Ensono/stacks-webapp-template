import {createRoutine} from "redux-saga-routines"
import {call, put, takeLatest, select} from "redux-saga/effects"

import {postMenu} from "../../services"

export const addMenuRoutine = createRoutine("ADD_MENU")

// TODO: Fake tenantId needs to be fixed with proper one.
export const initialState = {
    loading: false,
    error: null,
    added: false,
    name: "",
    description: "",
    tenantId: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    enabled: false,
    menuId: "",
}

export const isLoading = state => state.addMenu.loading
export const getError = state => state.addMenu.error
export const getNewlycreatedMenuId = state => state.addMenu.menuId
export const getMenuAdded = state => state.addMenu.added

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case addMenuRoutine.TRIGGER:
            return {
                ...initialState,
                ...action.payload,
            }
        case addMenuRoutine.REQUEST:
            return {
                ...state,
                loading: true,
            }
        case addMenuRoutine.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                added: false
            }
        case addMenuRoutine.SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                menuId: action.payload.id,
                added: true
            }
        default:
            return state
    }
}

export function* requestAddMenu({payload}) {
    yield put(addMenuRoutine.request())
    try {
        const response = yield call(
            postMenu,
            payload.name,
            payload.description,
            payload.enabled,
            payload.id,
        )
        yield put(addMenuRoutine.success(response))
    } catch (error) {
        yield put(addMenuRoutine.failure(error))
    }
}

export function* watchAddMenu() {
    yield takeLatest(addMenuRoutine.TRIGGER, requestAddMenu)
}

export const addMenuSagas = [watchAddMenu]
