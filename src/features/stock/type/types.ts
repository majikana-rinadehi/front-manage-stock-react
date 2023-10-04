export type Stock = {
    [key: string]: any
    id: number
    categoryId: number
    name: string
    amount: number
    expireDate?: string
    isExpired: boolean
    unit: string
}

export type StockCategory = {
    id: number
    name: string
    hasExpiredStock: boolean
}

export type StockCreate = Stock & {
    userId: number
}

export type StockCategoryCreate = {
    name: string
    userId: number
}