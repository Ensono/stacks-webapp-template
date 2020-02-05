interface BaseAnswer { 
    project_name: string,
    project_type: string,
    platform: string,
    deployment: string
}

interface PromptAnswer extends BaseAnswer {}

export {PromptAnswer}
