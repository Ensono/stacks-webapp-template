import { ssr_aks_tfs, csr_aks_tfs } from './workers/base'
import { PromptAnswer } from './model/prompt_answer'


enum FlowSelector {
    // 
}

namespace FlowSelector {
    export async function option1(instructions: PromptAnswer): Promise<object> {
        return await ssr_aks_tfs(instructions)
    }
    export async function option2(instructions: string): Promise<string> {
        return await csr_aks_tfs(instructions)
    }
}

export default FlowSelector


// import { ssr_aks_tfs } from './workers/base'

// export { ssr_aks_tfs }
