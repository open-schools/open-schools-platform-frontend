export interface ErrorType {
    data: {
        error: {
            code: string,
            message?: string,
            'violation_fields': any,
            violations: [string]
        }
    },
    status: number,
}
