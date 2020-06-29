import {EmailType} from "./auth.interface"
export const user = {
    displayName: "",
    picture: "",
    name: {
        familyName: "",
        givenName: "",
    },
    user_id: "",
    provider: "",
    id: "",
    locale: "",
    nickname: "",
    email: {
        value: "",
    } as EmailType,
}
