import { MainWorker } from './workers/main_worker'
import { CliAnswerModel } from './model/prompt_answer'
import { SsrAdoResponse } from './model/workers'

let mainWorker = new MainWorker()

export class FlowSelector {
    static async option_ssr_aks_azuredevops(instructions: CliAnswerModel): Promise<SsrAdoResponse> {
        return await mainWorker.ssr_aks_tfs(instructions)
    }
    static async option_netcore_aks_azuredevops(instructions: CliAnswerModel): Promise<SsrAdoResponse> {
        return await mainWorker.netcore_aks_tfs(instructions)
    }
    static async option_java_spring_aks_azuredevops(instructions: CliAnswerModel): Promise<SsrAdoResponse> {
        return await mainWorker.java_spring_aks_tfs(instructions)
    }
    static async option_csr_aks_azuredevops(instructions: CliAnswerModel): Promise<SsrAdoResponse> {
        return await mainWorker.csr_aks_tfs(instructions)
    }
}

export default  {
 FlowSelector
}
