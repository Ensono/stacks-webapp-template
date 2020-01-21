import { PromptAnswer } from './model/prompt_answer';
export declare class FlowSelector {
    static option_ssr_aks_azuredevops: (instructions: PromptAnswer) => Promise<object>;
    static option_csr_aks_azuredevops: (instructions: PromptAnswer) => Promise<object>;
}
export default FlowSelector;
