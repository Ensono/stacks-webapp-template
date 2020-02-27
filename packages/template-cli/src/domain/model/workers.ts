interface CliError {
    message: string
    stack: string
}

interface BaseResponse { 
    ok: boolean,
    message?: string,
    code?: number
    error?: CliError
}

interface SsrAdoResponse extends BaseResponse {}

export { BaseResponse, SsrAdoResponse, CliError }
