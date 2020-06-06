import { MainWorker } from './workers/main_worker'
import { CliAnswerModel } from './model/prompt_answer'
import { CliResponse } from './model/workers'

const mainWorker = new MainWorker()

export class FlowSelector extends MainWorker {
    static async optionSsrAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.ssrAksTfs(instructions)
    }

    static async optionNetcoreAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.netcoreAksTfs(instructions)
    }

    static async optionJavaSpringAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.javaSpringAksTfs(instructions)
    }

    static async optionCsrAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.csrAksTfs(instructions)
    }

    static async optionNetcoreSeleniumAnyAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.netcoreSeleniumTfs(instructions)
    }

    static async optionSsrGkeAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.ssrGkeTfs(instructions)
    }

    static async optionInfraAksAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.infraAksAzdevops(instructions)
    }
    
    static async optionJsTestcafeAnyAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.jsTestcafeTfs(instructions)
    }
}

export default  {
 FlowSelector
}
