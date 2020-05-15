import { FlowSelector }  from "../selectors"

export interface Workflow {
    [key: string]: Function
}

export function WorkflowOptions(): Workflow {
    return {
        ssr_aks_azdevops: FlowSelector.option_ssr_aks_azuredevops,
        netcore_aks_azdevops:  FlowSelector.option_netcore_aks_azuredevops,
        java_spring_aks_azdevops: FlowSelector.option_java_spring_aks_azuredevops,
        csr_aks_azdevops: FlowSelector.option_csr_aks_azuredevops,
        netcore_selenium_aks_azdevops: FlowSelector.option_netcore_selenium_aks_azdevops,
        ssr_gke_azdevops: FlowSelector.option_ssr_gke_azdevops,
        infra_aks_azdevops: FlowSelector.option_infra_aks_azdevops,
        js_testcafe_aks_azdevops: FlowSelector.option_js_testcafe_aks_azdevops
    }
}
