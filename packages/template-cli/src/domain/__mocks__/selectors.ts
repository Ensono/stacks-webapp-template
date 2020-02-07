import { PromptAnswer } from '../model/prompt_answer'

export class FlowSelector {
    static option_ssr_aks_azuredevops = async function(instructions: PromptAnswer): Promise<object> {
        return await jest.fn(() => Promise.resolve(instructions))
    }
}

export default  {
 FlowSelector
}
