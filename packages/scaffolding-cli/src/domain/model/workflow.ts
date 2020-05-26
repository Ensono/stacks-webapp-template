/* eslint-disable */

import { FlowSelector }  from "../selectors"

export interface Workflow {
    [key: string]: Function
}

export function WorkflowOptions(): Workflow {
    return {
        ssraksazdevops: FlowSelector.optionSsrAksAzuredevops,
        netcoreaksazdevops:  FlowSelector.optionNetcoreAksAzuredevops,
        javaspringaksazdevops: FlowSelector.optionJavaSpringAksAzuredevops,
        csraksazdevops: FlowSelector.optionCsrAksAzuredevops,
        testnetcoreseleniumanyazdevops: FlowSelector.optionNetcoreSeleniumAnyAzdevops,
        testjstestcafeanyazdevops: FlowSelector.optionJsTestcafeAnyAzdevops,
        ssrgkeazdevops: FlowSelector.optionSsrGkeAzdevops,
        infraakszdevops: FlowSelector.optionInfraAksAzdevops
    }
}
