export type ApiResponse<T> = {
    errors: any[]
    results: T[]
    total: number
}