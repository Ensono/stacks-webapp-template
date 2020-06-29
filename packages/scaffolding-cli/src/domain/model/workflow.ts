/* eslint-disable */

import { FlowSelector }  from "../selectors"

export interface Workflow {
    [key: string]: Function
}

export function WorkflowOptions(): Workflow {
    return {
        ssraksazdevops: FlowSelector.optionSsrAksAzuredevops,
        netcoreaksazdevops:  FlowSelector.optionNetcoreAksAzuredevops,
        netcoreaksjenkins: () => { return { code: 0, message: "Not Yet Implemented.\n\nThough this may not ever happen... 😞"}},
        netcoregkejenkins: () => { return { code: 0, message: "Not Yet Implemented.\n\nThough this may not ever happen... 😞"}},
        javaspringaksazdevops: FlowSelector.optionJavaSpringAksAzuredevops,
        javaspringaksjenkins: () => { return { code: 0, message: "Not Yet Implemented.\nWatch this space!"}},
        javaspringgkejenkins: () => { return { code: 0, message: "Not Yet Implemented.\nWatch this space!"}},
        csraksazdevops: FlowSelector.optionCsrAksAzuredevops,
        testnetcoreseleniumanyazdevops: FlowSelector.optionNetcoreSeleniumAnyAzdevops,
        testjstestcafeanyazdevops: FlowSelector.optionJsTestcafeAnyAzdevops,
        ssrgkeazdevops: FlowSelector.optionSsrGkeAzdevops,
        infraaksazdevops: FlowSelector.optionInfraAksAzdevops
    }
}
