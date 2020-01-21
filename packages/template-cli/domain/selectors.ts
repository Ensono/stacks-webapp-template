import { ssr_aks_tfs, csr_aks_tfs } from './workers/base_workflow_interface'
import { PromptAnswer } from './model/prompt_answer'


// enum FlowSelector {
//     // 
// }

export class FlowSelector {
    static option_ssr_aks_azuredevops = async function(instructions: PromptAnswer): Promise<object> {
        return await ssr_aks_tfs(instructions)
    }
    static option_csr_aks_azuredevops =  async function(instructions: PromptAnswer): Promise<object> {
        return await csr_aks_tfs(instructions)
    }
}

export default FlowSelector


// import { ssr_aks_tfs } from './workers/base'

// export { ssr_aks_tfs }
