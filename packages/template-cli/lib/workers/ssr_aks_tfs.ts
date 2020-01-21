import { copy, mkdir } from 'fs-extra'
import { PromptAnswer } from '../model/prompt_answer'
import { resolve } from 'path'

const TEMPLATES_DIRECTORY = `../../templates/`
const ssr_aks_azdevops = {

}

function copyFilter(src: string, dest: string) {
    return true
}

async function ssr_aks_tfs(instructions: PromptAnswer): Promise<object> {
    try {
        // await mkdir(resolve(process.cwd(), instructions.project_name), )
         await copy(resolve(__dirname, TEMPLATES_DIRECTORY), resolve(process.cwd(), instructions.project_name ), {filter: copyFilter})
        return instructions
    } catch (ex) {
        return ex
    }
}

export { ssr_aks_tfs }
