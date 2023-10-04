export type User = {
    id: number
    name: string
    mailAddress: string
}

export type UserAuth = {
    userId?: number,
    authProvider: string,
    uid: string
}