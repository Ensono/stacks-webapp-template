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

let userSelection: PromptAnswer = <PromptAnswer>{}
let cliModifiedSelection: CliAnswerModel
let exitMessage: ExitMessage = <ExitMessage>{}

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
    console.log("Never stop prompting!")
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
    if (cliSelection.projectType.startsWith("test_")) {
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
    let advancedQs: Array<PromptQuestion> = advanceQsFn()
    let advancedSelections: PromptAnswer = await prompt(advancedQs, {onCancel})
    advancedSelections = {
        ...basicSelection,
        ...advancedSelections,
    }
    return advancedSelections
}

/**
 * @private
 * @param config_path
 */
async function getFromConfig(config_path: string): Promise<CliAnswerModel> {
    let configSelection: PromptAnswer
    if (isAbsolute(config_path)) {
        configSelection = JSON.parse(readFileSync(config_path, "utf-8").trim())
    } else {
        configSelection = JSON.parse(
            readFileSync(resolve(process.cwd(), config_path), "utf-8").trim(),
        )
    }

    return computedSelection(configSelection)
}

async function selectFlow(selection: CliAnswerModel): Promise<ExitMessage> {
    // Converting to camel case
    let determinedChoice = `${selection.projectType}${selection?.platform
        ?.toUpperCase || "Any"}${selection.deployment.toUpperCase}`

    const workflows: Workflow = WorkflowOptions()
    try {
        let response = await workflows[determinedChoice](selection)
        exitMessage.code = response.code
        exitMessage.message = response.message
        if (response.code != 0) {
            throw <ExitMessage>{
                code: response.code,
                message: response.message,
            }
        }
        return exitMessage
    } catch (ex) {
        //Uncaught Exceptions
        let exCaught = ex as ExitMessage
        exCaught.code = ex.code || -1
        exCaught.message = ex.message
        return exCaught
    }
}
