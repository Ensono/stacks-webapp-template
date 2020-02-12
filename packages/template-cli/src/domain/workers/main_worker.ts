import { copy, mkdir } from 'fs-extra'
import { PromptAnswer } from '../model/prompt_answer'
import { SsrAdoResponse, CliError } from '../model/workers'
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
    /**
     * @param {PromptAnswer} instructions 
     * @returns 
     */
    async ssr_aks_tfs(instructions: PromptAnswer): Promise<SsrAdoResponse> {
        try {
            /**
             * Creates a directory if not present
             */
            await copy(resolve(__dirname, TEMPLATES_DIRECTORY), resolve(process.cwd(), instructions.project_name), {filter: copyFilter})

            return <SsrAdoResponse>{
                ok: true,
                message: "directory created"
            }
        } catch (ex) {
            const cliErr = ex as CliError
            return <SsrAdoResponse>{
                ok: false,
                code: ex.code || -1,
                error: cliErr
            };
        }
    }
}

export default { MainWorker }
