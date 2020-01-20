import { prompt, prompts } from 'prompts'
import { basename, resolve, join, isAbsolute } from 'path'
import { readFile, readFileSync } from 'fs'
import { PromptQuestion } from './model/prompt_question'
import { PromptAnswer } from './model/prompt_answer'
import { ExitMessage } from './model/cliResponse'
import FlowSelector from './selectors'

// FLOW 
// ProjectName 
// project Type (SSR/CSR)
// --> express with next
// --> platform target (AKS)
// --> deployment tooling (TFS)

let cliSelection: PromptAnswer
let exitMessage: ExitMessage
/**
 * 
 * @param default_project_name 
 * @returns 
 */
async function initializeQuestions(default_project_name: string, cli_args: Array<string>): Promise<ExitMessage> {
    // v0 of Question Selection
    if (cli_args.length > 0) {
        cliSelection = await _get_from_config(cli_args[0])
    } else {
        cliSelection = await _get_from_cli(default_project_name)
    }
    
    return await _select_flow(cliSelection)

    // return JSON.stringify(cliSelection)
}

/**
 * @private
 * @param default_project_name 
 */
async function _get_from_cli(default_project_name: string): Promise<PromptAnswer> {
    // Always assigning the project name question - static forever
    let initialQs: Array<PromptQuestion> = new Array<PromptQuestion>({
        type: 'text',
        name: 'project_name',
        message: 'Select Project Name',
        initial: default_project_name
    })

    const questions: Array<PromptQuestion> = JSON.parse(readFileSync(join(__dirname, 'config/questions.json'), 'utf-8').trim())
    questions.forEach(el => {
        initialQs = [...initialQs, el]
    });

    cliSelection = await prompt(initialQs)
    return cliSelection;
    // console.log('cliSelection :', JSON.stringify(cliSelection))
}

/**
 * @private
 * @param config_path 
 */
async function _get_from_config(config_path: string): Promise<PromptAnswer> {
   
    if (isAbsolute(config_path)){
        cliSelection = JSON.parse(readFileSync(config_path, 'utf-8').trim())
    } else {
        cliSelection = JSON.parse(readFileSync(resolve(process.cwd(), config_path), 'utf-8').trim())
    }

    return cliSelection;

}

async function _select_flow(selection: PromptAnswer): Promise<ExitMessage> {
    let determined_choice = `${selection.project_type}_${selection.platform}_${selection.deployment}`
    const workflows: any = {
        ssr_aks_tfs: FlowSelector.option1
    }

    // await FlowSelector['option1']
    // exitMessage.code = 0
    let message = await workflows[determined_choice](selection)
    // console.log(determined_choice)
    return message
}

export { initializeQuestions }
