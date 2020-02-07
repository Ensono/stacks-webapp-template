import { MainWorker } from './workers/main_worker'
import { PromptAnswer } from './model/prompt_answer'

let mainWorker: MainWorker

export class FlowSelector {
    static option_ssr_aks_azuredevops = async function(instructions: PromptAnswer): Promise<object> {
        let mainWorker = new MainWorker(instructions)
        return await mainWorker.ssr_aks_tfs()
    }
}

export default  {
 FlowSelector
}
