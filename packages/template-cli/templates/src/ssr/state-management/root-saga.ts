import {all, fork} from "redux-saga/effects"
import {getMenuSagas} from "../ducks/get-menus"

export const watchSagas = [...getMenuSagas]

function* rootSaga() {
    yield all(watchSagas.map(fork))
}

export default rootSaga
