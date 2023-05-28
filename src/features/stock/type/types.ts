export type Stock = {
    name: string
    amount: number
    // TODO: refactor variable name
    isExpired: boolean
}

export type StockCategory = {
    id: number
    name: string
    hasExpiredStock: boolean
}