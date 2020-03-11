import { prompt } from 'prompts'
import { resolve, isAbsolute } from 'path'
import { readFileSync } from 'fs'
import { cliQuestions, cliAdvancedQuestions, computedSelection } from './config/questions'
import { PromptQuestion } from './model/prompt_question'
import { PromptAnswer, CliAnswerModel } from './model/prompt_answer'
import { ExitMessage } from './model/cli_response'
import { Utils } from './workers/utils'
import { WorkflowOptions, Workflow } from './model/workflow'
import logger from 'simple-winston-logger-abstraction'
import chalk from 'chalk'

let userSelection: PromptAnswer = <PromptAnswer>{}
let cliModifiedSelection: CliAnswerModel;
let exitMessage: ExitMessage = <ExitMessage>{}

/**
 * @param default_project_name 
 * @returns 
 */
export async function runCli(default_project_name: string, cli_args: Array<string>): Promise<ExitMessage> {
    // v0 of Question Selection
    // let user_selection: PromptAnswer
    if (cli_args.length > 0) {
        cliModifiedSelection = await getFromConfig(cli_args[0])
    } else {
        userSelection = await getFromCli(default_project_name)
        cliModifiedSelection = computedSelection(userSelection)
    }
    return await selectFlow(cliModifiedSelection)
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
    if (cliSelection.advanced_config) {
        let advancedSelection = await advancedCliQuestion(cliSelection)
        return advancedSelection
    }
    return cliSelection;
}

async function advancedCliQuestion(basicSelection: PromptAnswer): Promise<PromptAnswer> {
    let advancedQs: Array<PromptQuestion> = cliAdvancedQuestions()
    let advancedSelections: PromptAnswer =  await prompt(advancedQs)
    advancedSelections = {
        ...basicSelection,
        ...advancedSelections
    }
    return advancedSelections
}

/**
 * @private
 * @param config_path 
 */
async function getFromConfig(config_path: string): Promise<CliAnswerModel> {
   let configSelection: CliAnswerModel
    if (isAbsolute(config_path)){
        configSelection = JSON.parse(readFileSync(config_path, 'utf-8').trim())
    } else {
        configSelection = JSON.parse(readFileSync(resolve(process.cwd(), config_path), 'utf-8').trim())
    }
    return configSelection;
}

async function selectFlow(selection: CliAnswerModel): Promise<ExitMessage> {
    let determined_choice = `${selection.project_type}_${selection.platform}_${selection.deployment}`

    const workflows: Workflow = WorkflowOptions()
    try {
        if (selection.create_config) {
            // keeping it simple for now
            // writing out sample config without value replacement for now
            await Utils.writeOutConfigFile(resolve(__dirname, 'config/sample.bootstrap-config.json'), `${selection.project_name}.bootstrap-config.json`)
            console.log(chalk.yellowBright(
            `Please re-run the CLI with the following command. \n
            ----- \n
            npx @amido-stacks/scaffolding-cli ${selection.project_name}.bootstrap-config.json \n
            ----- \n
            NB: IF you haven't gone through the advanced setup - plese ensure you have replaced all the relevant values.
            `))
        }
        let response = await workflows[determined_choice](selection)
        exitMessage.code = response.code
        exitMessage.message = response.message
    } catch (ex) {
        exitMessage.code = ex.code || -1
        exitMessage.message = ex.message
    }
    return exitMessage
}

