interface BaseQuestion {
    name: string
    type: string | Function
    message: string
    description?: string
    initial?: string | number | boolean
}

interface SelectQuestionOptions {
    title: string
    description?: string
    value: string
    disabled?: boolean
}

export interface PromptQuestion extends BaseQuestion {
    choices?: Array<SelectQuestionOptions>
}

