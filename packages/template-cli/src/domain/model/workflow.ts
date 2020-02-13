import { FlowSelector }  from "../selectors"

interface Workflow {
    [key: string]: Function
}

function WorkflowOptions(): Workflow {
    return {
        ssr_aks_azdevops: FlowSelector.option_ssr_aks_azuredevops,
    }
}

export { Workflow, WorkflowOptions }
