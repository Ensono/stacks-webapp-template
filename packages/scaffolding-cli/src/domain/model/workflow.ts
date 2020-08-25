/* eslint-disable */
import { FlowSelector, IFlowSelector } from "../selectors"
export interface Workflow {
    [key: string]: Function
}

const flowSelector: IFlowSelector = new FlowSelector()
export const WorkflowOptions = (): Workflow => {
    return {
        ssraksazdevops: flowSelector.optionSsrAksAzuredevops,
        ssrgkeazdevops: flowSelector.optionSsrGkeAzdevops,
        ssrgkejenkins: flowSelector.optionSsrGkeJenkins,
        netcoreaksazdevops: flowSelector.optionNetcoreAksAzuredevops,
        netcoreaksjenkins: () => { return { code: 0, message: "Not Yet Implemented.\n\nThough this may not ever happen... 😞" } },
        netcoregkejenkins: () => { return { code: 0, message: "Not Yet Implemented.\n\nThough this may not ever happen... 😞" } },
        javaspringaksazdevops: flowSelector.optionJavaSpringAksAzuredevops,
        javaspringgkeazdevops: () => { return { code: 0, message: "Not Yet Implemented.\nWatch this space!" } },
        javaspringaksjenkins: flowSelector.optionJavaSpringAksJenkins,
        javaspringgkejenkins: () => { return { code: 0, message: "Not Yet Implemented.\nWatch this space!" } },
        csraksazdevops: flowSelector.optionCsrAksAzuredevops,
        testnetcoreseleniumanyazdevops: flowSelector.optionNetcoreSeleniumAnyAzdevops,
        testjstestcafeanyazdevops: flowSelector.optionJsTestcafeAnyAzdevops,
        infraaksazdevops: flowSelector.optionInfraAksAzdevops,
        infragkeazdevops: flowSelector.optionInfraGkeAzdevops,
        infragkejenkins: flowSelector.optionInfraGkeJenkins,
    }
}
