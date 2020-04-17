export interface CliOptions { 
    [x: string]: unknown;
    configfile?: string;
    generatesampleconfig?: boolean;
    interactive?: boolean;
    _: string[];
    $0: string;
}


export interface ExitMessage {
    code: number | string,
    message: string
}

