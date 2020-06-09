export interface CliOptions { 
    [x: string]: unknown;
    config?: string;
    interactive?: boolean;
    _: string[];
    $0: string;
}


export interface ExitMessage {
    code: number | string,
    message: string
}

