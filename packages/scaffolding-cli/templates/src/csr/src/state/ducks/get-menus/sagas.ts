import {all, call, fork, put, takeEvery} from "redux-saga/effects"
import {
    MetaActionWithAPI,
    GetMenuActionTypes,
    MenuRaw,
} from "../../../interfaces/sagas.interface"
import apiCaller from "../../utils/apiCaller"
import {fetchPostsError, fetchPostsSuccess} from "./actions"

function* handleFetch(action: MetaActionWithAPI): Generator {
    try {
        // eslint-disable-next-line
        const res: MenuRaw[] | any = yield call(
            apiCaller,
            action.meta.method,
            action.meta.route,
        )

        yield put(fetchPostsSuccess(res))
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchPostsError(err.stack!))
        } else {
            yield put(fetchPostsError("An unknown error occured."))
        }
    }
}

function* watchFetchRequest(): Generator {
    yield takeEvery(GetMenuActionTypes.FETCH_POSTS, handleFetch)
}

export default function* postSaga() {
    yield all([fork(watchFetchRequest)])
}
