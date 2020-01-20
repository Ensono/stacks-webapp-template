import { PromptAnswer } from './model/prompt_answer';
declare enum FlowSelector {
}
declare namespace FlowSelector {
    function option1(instructions: PromptAnswer): Promise<object>;
    function option2(instructions: string): Promise<string>;
}
export default FlowSelector;
