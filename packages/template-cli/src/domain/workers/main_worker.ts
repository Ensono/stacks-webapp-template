import { PromptAnswer } from '../model/prompt_answer'
import { SsrAdoResponse, CliError } from '../model/workers'
import { Utils, copyFilter } from './utils'

const ssr_aks_azdevops = {}

export class MainWorker {
    /**
     * @param {PromptAnswer} instructions 
     * @returns 
     */
    async ssr_aks_tfs(instructions: PromptAnswer): Promise<SsrAdoResponse> {
        // let selectedFlowResponse: SsrAdoResponse;
        try {
            let selectedFlowResponse = await Utils.copyWorker(instructions.project_name) 
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
    MainWorker
}
