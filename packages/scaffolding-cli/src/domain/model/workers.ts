export interface CliError {
    message: string
    stack: string
}

export interface BaseResponse { 
    ok: boolean,
    message: string,
    code?: number | string
    error?: CliError
}

export interface TempCopy extends BaseResponse{
    tempPath: string
    finalPath: string
}

export interface ConfigResponse extends BaseResponse{
    configPath: string
}

export type CliResponse = BaseResponse
