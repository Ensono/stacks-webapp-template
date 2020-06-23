export interface UserType {
    displayName: string
    id: string
    user_id: string
    provider: string
    picture: string
    locale: string
    nickname: string
    name: name_type
    email: EmailType[]
}

export interface name_type {
    familyName: string
    givenName: string
}

export interface EmailType {
    value: string
}
