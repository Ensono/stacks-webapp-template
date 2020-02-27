import { copy, mkdir } from 'fs-extra'
import { PromptAnswer } from '../model/prompt_answer'
import { BaseResponse, SsrAdoResponse, CliError } from '../model/workers'
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


export async function copyWorker(directory_name: string): Promise<BaseResponse> {
    /**
     * Creates a directory if not present
     */
    let fsResponse: BaseResponse = <BaseResponse>{}
    try {
        await copy(resolve(__dirname, TEMPLATES_DIRECTORY), resolve(process.cwd(), directory_name), { filter: copyFilter })
        fsResponse.ok = true
        fsResponse.message =  "directory created"
    } catch(ex) {
        fsResponse.ok = false
        fsResponse.code = ex.code || -1
        fsResponse.message = ex.message
        fsResponse.error = ex.stack
    } finally {
        return fsResponse
    }
}


export class MainWorker {
    /**
     * @param {PromptAnswer} instructions 
     * @returns 
     */
    async ssr_aks_tfs(instructions: PromptAnswer): Promise<SsrAdoResponse> {
        // let selectedFlowResponse: SsrAdoResponse;
        try {
            let selectedFlowResponse = await copyWorker(instructions.project_name) 
            return selectedFlowResponse
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

export default {
    MainWorker,
    // copyFilter
    copyWorker
}
