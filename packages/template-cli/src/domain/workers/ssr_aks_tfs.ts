import { copy, mkdir } from 'fs-extra'
import { PromptAnswer } from '../model/prompt_answer'
import { resolve } from 'path'

const TEMPLATES_DIRECTORY = `../../../templates/`
const ssr_aks_azdevops = {}

function copyFilter(src: string, dest: string) {
    // return true
    if (src.indexOf("node_modules") > -1 || 
        src.indexOf(".next") > -1 || 
        src.indexOf("coverage") > -1 || 
        src.indexOf("dist") > -1) {
        return false
    } else {
        return true
    }
}

async function ssr_aks_tfs(instructions: PromptAnswer): Promise<object> {
    try {
        /**
         * Creates a directory if not present
         */
        await copy(resolve(__dirname, TEMPLATES_DIRECTORY), resolve(process.cwd(), instructions.project_name ), {filter: copyFilter})
        return instructions
    } catch (ex) {
        return ex
    }
}

export { ssr_aks_tfs }
