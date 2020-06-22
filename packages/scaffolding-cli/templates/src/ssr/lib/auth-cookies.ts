import {serialize} from "cookie"

export function removeTokenCookie(res, cookie_name) {
    if (!cookie_name) return
    const cookie = serialize(cookie_name, "", {
        maxAge: -1,
    })
    console.log("cookies:::", cookie)

    res.setHeader("Set-Cookie", cookie)
    return res
}
