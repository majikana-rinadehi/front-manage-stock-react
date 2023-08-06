export type Stock = {
    [key: string]: any
    id: number
    categoryId: number
    name: string
    amount: number
    expireDate?: string
    isExpired: boolean
}

export type StockCategory = {
    id: number
    name: string
    hasExpiredStock: boolean
}