import {prompt} from "prompts"
import {resolve, isAbsolute} from "path"
import {readFileSync} from "fs-extra"
import {cliQuestions} from "../config/questions"
import {PromptQuestion} from "../model/prompt_question"
import {PromptAnswer} from "../model/prompt_answer"
import {ExitMessage} from "../model/cli_response"
import {WorkflowOptions, Workflow} from "../model/workflow"

let userSelection: PromptAnswer = <PromptAnswer>{}
let exitMessage: ExitMessage = <ExitMessage>{}

/**
 *
 * @param defaultProjectName
 * @returns
 */
async function runCli(
    defaultProjectName: string,
    cli_args: Array<string>,
): Promise<ExitMessage> {
    // v0 of Question Selection
    // let user_selection: PromptAnswer
    if (cli_args.length > 0) {
        userSelection = await getFromConfig(cli_args[0])
    } else {
        userSelection = await getFromCli(defaultProjectName)
    }

    return await selectFlow(userSelection)
}

/**
 * @private
 * @param defaultProjectName
 */
async function getFromCli(defaultProjectName: string): Promise<PromptAnswer> {
    let cliSelection: PromptAnswer

    // Always assigning the project name question - static forever
    let initialQs: Array<PromptQuestion> = new Array<PromptQuestion>({
        type: "text",
        name: "projectName",
        message: "Select Project Name",
        initial: defaultProjectName,
    })

    const questions: Array<PromptQuestion> = cliQuestions(defaultProjectName)
    questions.forEach(el => {
        initialQs = [...initialQs, el]
    })

    cliSelection = await prompt(initialQs)
    return cliSelection
}

/**
 * @private
 * @param config_path
 */
async function getFromConfig(config_path: string): Promise<PromptAnswer> {
    let configSelection: PromptAnswer

    if (isAbsolute(config_path)) {
        configSelection = JSON.parse(readFileSync(config_path, "utf-8").trim())
    } else {
        configSelection = JSON.parse(
            readFileSync(resolve(process.cwd(), config_path), "utf-8").trim(),
        )
    }

    return configSelection
}

async function selectFlow(selection: PromptAnswer): Promise<ExitMessage> {
    let determinedChoice = `${selection.projectType}${selection?.platform || "Any"}${selection.deployment}`

    const workflows: Workflow = WorkflowOptions()

    try {
        let message = await workflows[determinedChoice](selection)
        exitMessage.code = 0
        exitMessage.message = message
    } catch (ex) {
        exitMessage.code = ex.code || -1
        exitMessage.message = ex.message
    }
    return exitMessage
}

export {runCli}
