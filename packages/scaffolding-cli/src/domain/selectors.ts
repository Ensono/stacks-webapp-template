/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/require-await */
import { MainWorker } from './workers/main_worker'
import { CliAnswerModel } from './model/prompt_answer'
import { CliResponse } from './model/workers'

const mainWorker = new MainWorker()

export interface IFlowSelector {
    optionSsrAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse>

    optionSsrGkeAzdevops(instructions: CliAnswerModel): Promise<CliResponse>

    optionSsrGkeJenkins(instructions: CliAnswerModel): Promise<CliResponse>

    optionNetcoreAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse>

    optionJavaSpringAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse>

    optionJavaSpringAksJenkins(instructions: CliAnswerModel): Promise<CliResponse>

    optionCsrAksAzuredevops(instructions: CliAnswerModel):Promise<CliResponse>

    optionNetcoreSeleniumAnyAzdevops(instructions: CliAnswerModel):Promise<CliResponse>

    optionJsTestcafeAnyAzdevops(instructions: CliAnswerModel):Promise<CliResponse>

    optionInfraAksAzdevops(instructions: CliAnswerModel):Promise<CliResponse>

    optionInfraGkeAzdevops(instructions: CliAnswerModel):Promise<CliResponse>

    optionInfraGkeJenkins(instructions: CliAnswerModel):Promise<CliResponse>
}

export class FlowSelector implements IFlowSelector {

    async optionSsrAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.ssrAksTfs(instructions)
    }

    async optionSsrGkeAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.ssrGkeTfs(instructions)
    }

    async optionSsrGkeJenkins(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.ssrGkeJenkins(instructions)
    }

    async optionNetcoreAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.netcoreAksTfs(instructions)
    }

    async optionJavaSpringAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.javaSpringAksTfs(instructions)
    }

    async optionJavaSpringAksJenkins(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.javaSpringAksJenkins(instructions)
    }

    async optionCsrAksAzuredevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.csrAksTfs(instructions)
    }

    async optionNetcoreSeleniumAnyAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.netcoreSeleniumTfs(instructions)
    }

    async optionInfraAksAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.infraAksAzdevops(instructions)
    }

    async optionInfraGkeAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.infraGkeAzdevops(instructions)
    }

    async optionInfraGkeJenkins(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.infraGkeJenkins(instructions)
    }

    async optionJsTestcafeAnyAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        return mainWorker.jsTestcafeTfs(instructions)
    }
}
