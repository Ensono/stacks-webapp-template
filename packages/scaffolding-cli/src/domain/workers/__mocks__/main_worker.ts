import { PromptAnswer } from '../../model/prompt_answer'
import { CliResponse, CliError } from '../../model/workers'

export class MainWorker {
    /**
     * 
     * @param instructions 
     */
    async ssr_aks_tfs(instructions: PromptAnswer): Promise<any> {
        let mockRes: CliResponse = {
            ok: true,
            message: "" 
        } as CliResponse
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
