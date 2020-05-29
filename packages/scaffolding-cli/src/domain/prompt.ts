import {prompt} from "prompts"
import {resolve, isAbsolute} from "path"
import {readFileSync} from "fs"
import {
    cliQuestions,
    computedSelection,
    platformQuestions,
    advancedQuestions,
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
    defaultProjectName: string
): Promise<ExitMessage> {
    userSelection = await getFromCli(defaultProjectName)
    cliModifiedSelection = computedSelection(userSelection)
    return await selectFlow(cliModifiedSelection)
}

export async function runConfig(cliArgs: CliOptions): Promise<ExitMessage> {
    cliModifiedSelection = await getFromConfig(cliArgs.configfile || "")
    return await selectFlow(cliModifiedSelection)
}

const onCancel = (prompt: any) => {
    console.log("Selecting default answer.")
    return true
}

/**
 * @private
 * @param defaultProjectName
 */
async function getFromCli(defaultProjectName: string): Promise<PromptAnswer> {
    let cliSelection: PromptAnswer
    let initialQs: Array<PromptQuestion> = new Array<PromptQuestion>()
    const questions: Array<PromptQuestion> = cliQuestions(defaultProjectName)
    questions.forEach(el => {
        initialQs = [...initialQs, el]
    })

    cliSelection = await prompt(initialQs, {onCancel})
    if (cliSelection.projectType.startsWith("test")) {
        // let testSelection = await testAdvancedCliQuestion(cliSelection, testQuestions)
        // return testSelection
    } else {
        let platformSelection = await advancedCliQuestion(
            cliSelection,
            platformQuestions,
        )
        if (platformSelection?.enableAdvanced) {
            let advancedSelection = await advancedCliQuestion(
                platformSelection,
                advancedQuestions,
            )
            return advancedSelection
        }
        return platformSelection
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
        configSelection = JSON.parse(readFileSync(configPath, "utf-8").trim())
    } else {
        configSelection = JSON.parse(
            readFileSync(resolve(process.cwd(), configPath), "utf-8").trim(),
        )
    }

    return computedSelection(configSelection)
}

async function selectFlow(selection: CliAnswerModel): Promise<ExitMessage> {
    const determinedChoice = `${selection.projectType}${selection?.platform || "any"}${selection.deployment}`

    const workflows: Workflow = WorkflowOptions()
    try {
        const response = await workflows[determinedChoice](selection)
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
        exCaught.message = ex.message
        return exCaught
    }
}
