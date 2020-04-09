import {all, fork} from "redux-saga/effects"
import {getMenuSagas} from "../ducks/get-menus"
import {addMenuSagas} from "../ducks/add-menu"

export const watchSagas = [...getMenuSagas, ...addMenuSagas]

function* rootSaga() {
    yield all(watchSagas.map(fork))
}

export default rootSaga
