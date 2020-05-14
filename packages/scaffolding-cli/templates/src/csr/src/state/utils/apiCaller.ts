import axios, {Method} from "axios"

export default function apiCaller<T>(
    method: Method,
    path: string,
    data?: any,
): Promise<T[] | null> {
    return axios({
        method,
        url: `http://localhost:3000${path}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        data: data ? JSON.stringify(data) : null,
    }).then(res => {
        return res.data.results
    })
}
