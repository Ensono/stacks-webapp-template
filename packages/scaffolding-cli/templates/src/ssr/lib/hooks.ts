import useSWR from "swr"

const fetcher = url =>
    fetch(url)
        .then(r => r.json())
        .then(data => {
            return {user: data?.user || null}
        })

export function useUser() {
    const {data, error} = useSWR("/user", fetcher)
    const user = data?.user
    return error ? null : user
}
