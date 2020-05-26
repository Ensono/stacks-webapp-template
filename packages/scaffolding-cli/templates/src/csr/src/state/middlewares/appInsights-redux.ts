import {AnyAction, Dispatch, Middleware, MiddlewareAPI} from "redux"
import {trackReduxAction} from "../../utility/telemetry"
import {MetaActionWithAPI} from "../../interfaces/sagas.interface"

export default function createAppInsightsLogger(): Middleware {
    return (store: MiddlewareAPI<Dispatch<AnyAction>>) => (
        next: Dispatch<AnyAction>,
    ) => (action: MetaActionWithAPI) => {
        trackReduxAction(action)
        return next(action)
    }
}
