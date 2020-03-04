import { PromptAnswer } from '../../model/prompt_answer'
import { BaseResponse, SsrAdoResponse, CliError } from '../../model/workers'


const TEMPLATES_DIRECTORY = `../../../templates/`
const ssr_aks_azdevops = {}

export class MainWorker {
    constructor() {
    }
    /**
     * 
     * @param instructions 
     */
    async ssr_aks_tfs(instructions: PromptAnswer): Promise<any> {
        let mockRes: SsrAdoResponse = <SsrAdoResponse>{
            ok: true,
            message: "" 
        }
        try {
            return await jest.fn(() => mockRes)
        } catch (ex) {
            return ex;
        }
    }
}

export default {
    MainWorker
}
