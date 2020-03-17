import { prompt } from 'prompts'
import { resolve, isAbsolute } from 'path'
import { readFile, readFileSync } from 'fs'
import { cliQuestions, cliAdvancedQuestions, computedSelection } from './config/questions'
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

export async function generateSampleConfig (): Promise<ExitMessage> {
    try {
        await Utils.writeOutConfigFile(`sample.bootstrap-config.json`)
        exitMessage.code = 0
        exitMessage.message = 
`Sample config file has been written out to current directory \n
Please re-run the CLI with the following command. \n
----- \n
npx @amido-stacks/scaffolding-cli run -c sample.bootstrap-config.json \n
----- \n
NB: IF you haven't gone through the advanced setup - plese ensure you have replaced all the relevant values.
`
        return exitMessage;
    } catch (ex) {
        exitMessage.code = ex.code || -1
        exitMessage.message = ex.error?.message || ex.message
        return exitMessage
    }
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
        configSelection = JSON.parse(readFileSync(resolve(process.cwd(), config_path),'utf-8').trim())
    }
    return configSelection;
}

async function selectFlow(selection: CliAnswerModel): Promise<ExitMessage> {
    let determined_choice = `${selection.project_type}_${selection.platform}_${selection.deployment}`

    const workflows: Workflow = WorkflowOptions()
    try {
//         if (selection.create_config) {
//             // keeping it simple for now
//             // writing out sample config without value replacement for now
//             await Utils.writeOutConfigFile(resolve(__dirname, 'config/sample.bootstrap-config.json'), `${selection.project_name}.bootstrap-config.json`)
//             console.log(chalk.yellowBright(
// `Sample config file has been written out to current directory \n
// Please re-run the CLI with the following command. \n
// ----- \n
// npx @amido-stacks/scaffolding-cli ${selection.project_name}.bootstrap-config.json \n
// ----- \n
// NB: IF you haven't gone through the advanced setup - plese ensure you have replaced all the relevant values.
// `
//             ))
//         }
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

