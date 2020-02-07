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

export class MainWorker {
    constructor(private instructions: PromptAnswer) {
    }
    /**
     * 
     * @param instructions 
     */
    async ssr_aks_tfs(): Promise<object> {
        try {
            /**
             * Creates a directory if not present
             */
            await copy(resolve(__dirname, TEMPLATES_DIRECTORY), resolve(process.cwd(), this.instructions.project_name), {filter: copyFilter})
            return this.instructions
        } catch (ex) {
            return ex
        }
    }
}

export default { MainWorker }
