import {createRoutine} from "redux-saga-routines"
import {call, put, takeEvery} from "redux-saga/effects"
import {getMenu} from "../../services"

export const requestMenusListRoutine = createRoutine("MENU")

export const initialState = {
    loading: false,
    error: null,
    menuItems: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case requestMenusListRoutine.TRIGGER:
            return initialState
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
                menuItems: action.payload.menuItems,
            }
        default:
            return state
    }
}

export function* requestMenuList({payload}) {
    const {phoneNumber, areaCode} = payload
    const inputPhoneNumberWithAreaCode = `${areaCode}${phoneNumber}`
    yield put(requestMenusListRoutine.request(payload))
    try {
        const response = yield call(getMenu)
        yield put(requestMenusListRoutine.success(response))
    } catch (error) {
        yield put(requestMenusListRoutine.failure(error))
    }
}

export function* watchRequestGetMenu() {
    yield takeEvery(requestMenusListRoutine.TRIGGER, requestMenuList)
}

export const getMenuSagas = [watchRequestGetMenu]

export default reducer
