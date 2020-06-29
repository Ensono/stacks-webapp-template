export interface UserType {
    displayName: string
    id: string
    user_id: string
    provider: string
    picture: string
    locale: string
    nickname: string
    name: NameType
    email: EmailType[]
}

export interface NameType {
    familyName: string
    givenName: string
}

export interface EmailType {
    value: string
}
