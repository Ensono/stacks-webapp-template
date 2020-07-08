/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable compat/compat */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { FlowSelector, IFlowSelector } from '../../domain/selectors'
import { CliAnswerModel } from '../../domain/model/prompt_answer'
import { MainWorker } from '../../domain/workers/main_worker'
import { CliError, CliResponse } from '../../domain/model/workers'

const mock_answer_ssr_aks_tfs = <CliAnswerModel>{
    projectName: "foo",
    projectType: "boo",
    platform: "aks",
    deployment: "jenkins"
}


jest.mock('../../domain/workers/main_worker')

const flowSelector: IFlowSelector = new FlowSelector()
describe("selector class tests", () => {

    describe("Positive assertions option_ssr_aks_azuredevops", () => {
        it("should call the ssr_aks_tfs worker", async () => {
            MainWorker.prototype.ssrAksTfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionSsrAksAzuredevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.ssrAksTfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.ssrAksTfs).toHaveBeenCalled()
        })

        it("should call the netcore_aks_tfs worker", async () => {
            MainWorker.prototype.netcoreAksTfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionNetcoreAksAzuredevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.netcoreAksTfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.netcoreAksTfs).toHaveBeenCalled()
        })

        it("should call the java_aks_tfs worker", async () => {
            MainWorker.prototype.javaSpringAksTfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionJavaSpringAksAzuredevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.javaSpringAksTfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.javaSpringAksTfs).toHaveBeenCalled()
        })

        it("should call the csr_aks_tfs worker", async () => {
            MainWorker.prototype.csrAksTfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionCsrAksAzuredevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.csrAksTfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.csrAksTfs).toHaveBeenCalled()
        })
        it("should call the infraAksAzdevops worker", async () => {
            MainWorker.prototype.infraAksAzdevops = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionInfraAksAzdevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.infraAksAzdevops).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.infraAksAzdevops).toHaveBeenCalled()
        })

        it("should call the infraGkeAzdevops worker", async () => {
            MainWorker.prototype.infraGkeAzdevops = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionInfraGkeAzdevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.infraGkeAzdevops).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.infraGkeAzdevops).toHaveBeenCalled()
        })

        it("should call the infraGkeJenkins worker", async () => {
            MainWorker.prototype.infraGkeJenkins = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionInfraGkeJenkins(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.infraGkeJenkins).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.infraGkeJenkins).toHaveBeenCalled()
        })

        it("should call the ssrGkeTfs worker", async () => {
            MainWorker.prototype.ssrGkeTfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionSsrGkeAzdevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.ssrGkeTfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.ssrGkeTfs).toHaveBeenCalled()
        })

        it("should call the ssrGkeJEnkins worker", async () => {
            MainWorker.prototype.ssrGkeJenkins = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionSsrGkeJenkins(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.ssrGkeJenkins).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.ssrGkeJenkins).toHaveBeenCalled()
        })

        it("should call the netcoreSeleniumTfs worker", async () => {
            MainWorker.prototype.netcoreSeleniumTfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionNetcoreSeleniumAnyAzdevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.netcoreSeleniumTfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.netcoreSeleniumTfs).toHaveBeenCalled()
        })

        it("should include the CliAnswerModel keys", async () => {
            MainWorker.prototype.ssrAksTfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            const selectedFlow = await flowSelector.optionCsrAksAzuredevops(mock_answer_ssr_aks_tfs)
            expect(selectedFlow).toHaveProperty("projectName")
            expect(selectedFlow).toBe(mock_answer_ssr_aks_tfs)
        })
    })
    describe("Negative assertions", () => {
        it("should return a code of -1 when error occurs", async () => {
            MainWorker.prototype.ssrAksTfs = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({ok: false, code: -1, error: new Error("Something weird happened") as CliError} as CliResponse);
            });
            const selectedFlow = await flowSelector.optionSsrAksAzuredevops(mock_answer_ssr_aks_tfs)
            expect(selectedFlow).toHaveProperty("ok")
            expect(selectedFlow.ok).toBe(false)
            expect(selectedFlow.error).toBeInstanceOf(Error)
            expect(selectedFlow.error).toHaveProperty("stack")
            expect(selectedFlow.error).toHaveProperty("message")
        })
    })
})

