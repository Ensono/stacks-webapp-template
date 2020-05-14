import {Method} from "axios"
import {all, call, fork, put, takeEvery} from "redux-saga/effects"
import {MetaAction, TypeConstant} from "typesafe-actions"
import apiCaller from "../../utils/apiCaller"
import {fetchPostsError, fetchPostsSuccess} from "./actions"
import {IPostRaw, PostActionTypes} from "./types"
// eslint-disable-next-line
export interface IMetaAction extends MetaAction<TypeConstant, IMeta> {}
interface IMeta {
    method: Method
    route: string
}
export interface IDispatchToProps {
    fetchPosts: () => IMetaAction
}

function* handleFetch(action: IMetaAction): Generator {
    try {
        const res: IPostRaw[] | any = yield call(
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
    yield takeEvery(PostActionTypes.FETCH_POSTS, handleFetch)
}

export default function* postSaga() {
    yield all([fork(watchFetchRequest)])
}
