export interface CliError {
    message: string
    stack: string
}

export interface BaseResponse { 
    ok: boolean,
    message: string,
    code?: number
    error?: CliError
}

export interface TempCopy extends BaseResponse{
    temp_path: string
    final_path: string
}

export interface SsrAdoResponse extends BaseResponse {}
