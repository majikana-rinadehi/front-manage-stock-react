export type User = {
    [key: string]: any
    id: number
    name: string
    mailAddress: string
}

export type UserAuth = {
    userId?: number,
    authProvider: string,
    uid: string
}