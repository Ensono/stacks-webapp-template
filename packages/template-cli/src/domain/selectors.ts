import { MainWorker } from './workers/main_worker'
import { PromptAnswer } from './model/prompt_answer'
import { SsrAdoResponse } from './model/workers'

let mainWorker = new MainWorker()

export class FlowSelector {
    static async option_ssr_aks_azuredevops(instructions: PromptAnswer): Promise<SsrAdoResponse> {
        return await mainWorker.ssr_aks_tfs(instructions)
    }
}

export default  {
 FlowSelector
}
