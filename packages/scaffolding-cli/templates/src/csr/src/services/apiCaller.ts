import axios, {Method} from "axios"
import {MenuApiResponse} from "../interfaces/sagas.interface"
import {trackError} from "../utility/telemetry"

export default function apiCaller<T>(
    method: Method,
    path: string,
    data?: MenuApiResponse,
): Promise<T[] | null> {
    return axios({
        method,
        url: `${process.env.API_BASE}${path}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: data ? JSON.stringify(data) : null,
    })
        .then(res => {
            return res.data.results
        })
        .catch(err => {
            // appInsights: track error event
            trackError(err)
            throw err
        })
}
