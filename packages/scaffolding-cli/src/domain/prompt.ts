import {prompt} from "prompts"
import {resolve, isAbsolute} from "path"
import { readFile } from "fs-extra"
import {
    cliQuestions,
    computedSelection,
    platformQuestions,
    advancedQuestions,
    cliTestQuestions,
    language,
} from "./config/questions"
import {PromptQuestion} from "./model/prompt_question"
import {PromptAnswer, CliAnswerModel} from "./model/prompt_answer"
import {ExitMessage, CliOptions} from "./model/cli_response"
import {WorkflowOptions, Workflow} from "./model/workflow"

let userSelection: PromptAnswer = {} as PromptAnswer
let cliModifiedSelection: CliAnswerModel
const exitMessage: ExitMessage = {} as ExitMessage

/**
 * @param defaultProjectName
 * @returns
 */
export async function runCli(
    defaultProjectName: string,
    cliArgs: CliOptions
): Promise<ExitMessage> {
    userSelection = await getFromCli(defaultProjectName, cliArgs)
    cliModifiedSelection = computedSelection(userSelection)
    return selectFlow(cliModifiedSelection)
}

export async function runConfig(cliArgs: CliOptions): Promise<ExitMessage> {
    cliModifiedSelection = await getFromConfig(cliArgs.config || "")
    return selectFlow(cliModifiedSelection)
}

const onCancel = () => {
    // Todo: ensure we have a flow for a user to force exit
    // eslint-disable-next-line no-throw-literal
    throw {
        code: 0,
        message: "Cancelling ...\nPlease re-run without interruption to complete the process"
    }
}

/**
 * @private
 * @param defaultProjectName
 */
async function getFromCli(defaultProjectName: string, cliArgs: CliOptions): Promise<PromptAnswer> {
    let initialQs: Array<PromptQuestion> = new Array<PromptQuestion>()
    
    // If the command is test, go through test flow:
    if (cliArgs._[0] === "test") {
        initialQs = cliTestQuestions(defaultProjectName)
        const cliSelection = await prompt(initialQs, {onCancel})
        return cliSelection
    }

    const questions = cliQuestions(defaultProjectName)
    questions.forEach(el => {
        initialQs = [...initialQs, el]
    })

    const cliSelection = await prompt(initialQs, {onCancel})
    // const platformSelection = await advancedCliQuestion(
    //     cliSelection,
    //     platformQuestions,
    // )

    if (cliSelection?.enableAdvanced) {
        const advancedSelection = await advancedCliQuestion(
            cliSelection,
            advancedQuestions,
        )
        if (language[cliSelection.projectType]) {
            const languageAdvanced = await advancedCliQuestion(
                advancedSelection,
                language[cliSelection.projectType]
            )
            return languageAdvanced
        } 
        return advancedSelection
    }

    return cliSelection
}

async function advancedCliQuestion(
    basicSelection: PromptAnswer,
    advanceQsFn: Function,
): Promise<PromptAnswer> {
    const advancedQs: Array<PromptQuestion> = advanceQsFn()
    let advancedSelections: PromptAnswer = await prompt(advancedQs, {onCancel})
    advancedSelections = {
        ...basicSelection,
        ...advancedSelections,
    }
    return advancedSelections
}

/**
 * @private
 * @param configPath
 */
async function getFromConfig(configPath: string): Promise<CliAnswerModel> {
    let configSelection: PromptAnswer
    if (isAbsolute(configPath)) {
        configSelection = JSON.parse((await readFile(configPath, "utf-8")).trim())
    } else {
        configSelection = JSON.parse(
            (await readFile(resolve(process.cwd(), configPath), "utf-8")).trim(),
        )
    }
    return computedSelection(configSelection)
}

async function selectFlow(selection: CliAnswerModel): Promise<ExitMessage> {
    const determinedChoice = `${selection.projectType}${selection?.platform || "any"}${selection.deployment}`

    const workflows: Workflow = WorkflowOptions()
    try {
        const response = await workflows[determinedChoice.toLowerCase()](selection)
        exitMessage.code = response.code
        exitMessage.message = response.message
        if (response.code !== 0) {
            return {
                code: response.code,
                message: response.message,
            } as ExitMessage
        }
        return exitMessage
    } catch (ex) {
        // Uncaught Exceptions
        const exCaught = ex as ExitMessage
        exCaught.code = ex.code || -1
        exCaught.message = `${ex.message}\n${ex.stack}`
        return exCaught
    }
}
