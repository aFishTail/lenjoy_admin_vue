interface CommonResponse<T> {
    data: T
    message: string
    code: number
}

interface PageResult<T> {
    records: T[];
    total: number
}