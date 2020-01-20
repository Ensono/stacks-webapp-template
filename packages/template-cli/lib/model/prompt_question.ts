interface BaseQuestion {
    name: string
    type: string
    message: string
    initial?: string | number
}

interface SelectQuestionOptions {
    title: string
    description?: string
    value: string
    disabled?: boolean
}

interface PromptQuestion extends BaseQuestion {
    choices?: Array<SelectQuestionOptions>
}

export { PromptQuestion }
