import { FlowSelector }  from "../selectors"

export interface Workflow {
    [key: string]: Function
}

export function WorkflowOptions(): Workflow {
    return {
        ssrAksAzdevops: FlowSelector.optionSsrAksAzuredevops.bind(FlowSelector),
        netcoreAksAzdevops:  FlowSelector.optionNetcoreAksAzuredevops.bind(FlowSelector),
        javaSpringAksAzdevops: FlowSelector.optionJavaSpringAksAzuredevops.bind(FlowSelector),
        csrAksAzdevops: FlowSelector.optionCsrAksAzuredevops.bind(FlowSelector),
        testNetcoreSeleniumAnyAzdevops: FlowSelector.optionNetcoreSeleniumAnyAzdevops.bind(FlowSelector),
        testJsTestcafeAnyAzdevops: FlowSelector.optionJsTestcafeAnyAzdevops.bind(FlowSelector),
        ssrGkeAzdevops: FlowSelector.optionSsrGkeAzdevops.bind(FlowSelector),
        infraAksAzdevops: FlowSelector.optionInfraAksAzdevops.bind(FlowSelector)
    }
}
