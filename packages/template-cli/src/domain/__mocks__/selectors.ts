import { PromptAnswer } from '../model/prompt_answer'

export class FlowSelector {
    static async option_ssr_aks_azuredevops(instructions: PromptAnswer): Promise<object> {
        return await jest.fn(() => Promise.resolve(instructions))
    }
}

export default  {
 FlowSelector
}
