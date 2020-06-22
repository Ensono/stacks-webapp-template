export interface UserType {
    displayName: string
    id: string
    user_id: string
    provider: string
    picture: string
    locale: string
    nickname: string
    name: name_type
    email: email_type[]
}

interface name_type {
    familyName: string
    givenName: string
}

interface email_type {
    value: string
}
