import prompts, { prompt } from 'prompts'
import { resolve, isAbsolute } from 'path'
import { readFile, readFileSync } from 'fs'
import { cliQuestions, computedSelection, testQuestions, platformQuestions, advancedQuestions } from './config/questions'
import { PromptQuestion } from './model/prompt_question'
import { PromptAnswer, CliAnswerModel } from './model/prompt_answer'
import { ExitMessage, CliOptions } from './model/cli_response'
import { Utils } from './workers/utils'
import { WorkflowOptions, Workflow } from './model/workflow'

let userSelection: PromptAnswer = <PromptAnswer>{}
let cliModifiedSelection: CliAnswerModel;
let exitMessage: ExitMessage = <ExitMessage>{}

/**
 * @param default_project_name 
 * @returns 
 */
export async function runCli(default_project_name: string, cli_args: CliOptions): Promise<ExitMessage> {
    userSelection = await getFromCli(default_project_name)
    cliModifiedSelection = computedSelection(userSelection)
    return await selectFlow(cliModifiedSelection)
}


export async function runConfig(cli_args: CliOptions): Promise<ExitMessage> {
    cliModifiedSelection = await getFromConfig(cli_args.configfile || '')
    return await selectFlow(cliModifiedSelection)
}

const onCancel = (prompt: any) => {
    console.log('Never stop prompting!');
    return true;
  }

/**
 * @private
 * @param default_project_name
 */
async function getFromCli(default_project_name: string): Promise<PromptAnswer> {
    let cliSelection: PromptAnswer
    let initialQs: Array<PromptQuestion> = new Array<PromptQuestion>()
    const questions: Array<PromptQuestion> = cliQuestions(default_project_name)
    questions.forEach(el => {
        initialQs = [...initialQs, el]
    });

    cliSelection = await prompt(initialQs, { onCancel })
    if (cliSelection.project_type.startsWith('test_')) {
        // let testSelection = await testAdvancedCliQuestion(cliSelection, testQuestions)
        // return testSelection
    } else {
        let platformSelection = await advancedCliQuestion(cliSelection, platformQuestions)
        if (platformSelection?.enable_advanced) {
            let advancedSelection = await advancedCliQuestion(platformSelection, advancedQuestions)
            return advancedSelection
        }
        return platformSelection
    }
    return cliSelection;
}

async function advancedCliQuestion(basicSelection: PromptAnswer, advanceQsFn: Function): Promise<PromptAnswer> {
    let advancedQs: Array<PromptQuestion> = advanceQsFn()
    let advancedSelections: PromptAnswer =  await prompt(advancedQs, { onCancel })
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
   let configSelection: PromptAnswer
    if (isAbsolute(config_path)){
        configSelection = JSON.parse(readFileSync(config_path, 'utf-8').trim())
    } else {
        configSelection = JSON.parse(readFileSync(resolve(process.cwd(), config_path),'utf-8').trim())
    }

    return computedSelection(configSelection);
}

async function selectFlow(selection: CliAnswerModel): Promise<ExitMessage> {
    let determined_choice = `${selection.project_type}_${selection?.platform || "any"}_${selection.deployment}`

    const workflows: Workflow = WorkflowOptions()
    try {
        let response = await workflows[determined_choice](selection)
        exitMessage.code = response.code
        exitMessage.message = response.message
        if (response.code != 0) {
            throw <ExitMessage>{
                code: response.code,
                message: response.message
            }
        }
        return exitMessage
    } catch (ex) { //Uncaught Exceptions
        let exCaught = ex as ExitMessage
        exCaught.code = ex.code || -1
        exCaught.message = ex.message
        return exCaught
    }
}
