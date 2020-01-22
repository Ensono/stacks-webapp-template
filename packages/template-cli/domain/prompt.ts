import { prompt, prompts } from 'prompts'
import { basename, resolve, join, isAbsolute } from 'path'
import { readFile, readFileSync } from 'fs'
import cliQuestions from './config/questions'
import { PromptQuestion } from './model/prompt_question'
import { PromptAnswer } from './model/prompt_answer'
import { ExitMessage } from './model/cli_response'
import FlowSelector from './selectors'
import { WorkflowOptions, Workflow } from './model/workflow'

// FLOW 
// ProjectName 
// project Type (SSR/CSR)
// --> express with next
// --> platform target (AKS)
// --> deployment tooling (TFS)

let userSelection: PromptAnswer = <PromptAnswer>{}
let exitMessage: ExitMessage = <ExitMessage>{}

/**
 * 
 * @param default_project_name 
 * @returns 
 */
async function runCli(default_project_name: string, cli_args: Array<string>): Promise<ExitMessage> {
    // v0 of Question Selection
    // let user_selection: PromptAnswer
    if (cli_args.length > 0) {
        userSelection = await getFromConfig(cli_args[0])
    } else {
        userSelection = await getFromCli(default_project_name)
    }
    // selections.project_name = userSelection

    return await selectFlow(userSelection)

}

/**
 * @private
 * @param default_project_name 
 */
async function getFromCli(default_project_name: string): Promise<PromptAnswer> {
   let cliSelection: PromptAnswer
    
    // Always assigning the project name question - static forever
    let initialQs: Array<PromptQuestion> = new Array<PromptQuestion>({
        type: 'text',
        name: 'project_name',
        message: 'Select Project Name',
        initial: default_project_name
    })

    const questions: Array<PromptQuestion> = cliQuestions()
    questions.forEach(el => {
        initialQs = [...initialQs, el]
    });

    cliSelection = await prompt(initialQs)
    return cliSelection;
}

/**
 * @private
 * @param config_path 
 */
async function getFromConfig(config_path: string): Promise<PromptAnswer> {
   let configSelection: PromptAnswer

    if (isAbsolute(config_path)){
        configSelection = JSON.parse(readFileSync(config_path, 'utf-8').trim())
    } else {
        configSelection = JSON.parse(readFileSync(resolve(process.cwd(), config_path), 'utf-8').trim())
    }

    return configSelection;

}

async function selectFlow(selection: PromptAnswer): Promise<ExitMessage> {
    let determined_choice = `${selection.project_type}_${selection.platform}_${selection.deployment}`

    const workflows: Workflow = WorkflowOptions()

    try {
        let message = await workflows[determined_choice](selection)
        exitMessage.code = 0
        exitMessage.message = message

    } catch (ex) {
        exitMessage.code = ex.code || -1
        exitMessage.message = ex.message
    }
    return exitMessage
}

export { runCli }
