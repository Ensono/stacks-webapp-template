import { FlowSelector } from '../../domain/selectors'
import { CliAnswerModel } from '../../domain/model/prompt_answer'
import { MainWorker } from '../../domain/workers/main_worker'
import { CliError, CliResponse } from '../../domain/model/workers'

let mock_answer_ssr_aks_tfs = <CliAnswerModel>{
    project_name: "foo",
    project_type: "boo",
    platform: "az",
    deployment: "tfs"
}


jest.mock('../../domain/workers/main_worker')

describe("selector class tests", () => {

    describe("Positive assertions option_ssr_aks_azuredevops", () => {
        it("should call the ssr_aks_tfs worker", async () => {
            MainWorker.prototype.ssr_aks_tfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            let selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.ssr_aks_tfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.ssr_aks_tfs).toHaveBeenCalled()
        })

        it("should call the netcore_aks_tfs worker", async () => {
            MainWorker.prototype.netcore_aks_tfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            let selectedFlow = await FlowSelector.option_netcore_aks_azuredevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.netcore_aks_tfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.netcore_aks_tfs).toHaveBeenCalled()
        })

        it("should call the java_aks_tfs worker", async () => {
            MainWorker.prototype.java_spring_aks_tfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            let selectedFlow = await FlowSelector.option_java_spring_aks_azuredevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.java_spring_aks_tfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.java_spring_aks_tfs).toHaveBeenCalled()
        })

        it("should call the csr_aks_tfs worker", async () => {
            MainWorker.prototype.csr_aks_tfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            let selectedFlow = await FlowSelector.option_csr_aks_azuredevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.csr_aks_tfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.csr_aks_tfs).toHaveBeenCalled()
        })
        it("should call the infra_aks_azdevops worker", async () => {
            MainWorker.prototype.infra_aks_azdevops = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            let selectedFlow = await FlowSelector.option_infra_aks_azdevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.infra_aks_azdevops).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.infra_aks_azdevops).toHaveBeenCalled()
        })
        it("should call the ssr_gke_tfs worker", async () => {
            MainWorker.prototype.ssr_gke_tfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            let selectedFlow = await FlowSelector.option_ssr_gke_azdevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.ssr_gke_tfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.ssr_gke_tfs).toHaveBeenCalled()
        })
        it("should call the netcore_selenium_tfs worker", async () => {
            MainWorker.prototype.netcore_selenium_tfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            let selectedFlow = await FlowSelector.option_netcore_selenium_aks_azdevops(mock_answer_ssr_aks_tfs)
            expect(MainWorker.prototype.netcore_selenium_tfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.netcore_selenium_tfs).toHaveBeenCalled()
        })
        it("should include the CliAnswerModel keys", async () => {
            MainWorker.prototype.ssr_aks_tfs = jest.fn().mockResolvedValue(mock_answer_ssr_aks_tfs)
            let selectedFlow = await FlowSelector.option_csr_aks_azuredevops(mock_answer_ssr_aks_tfs)
            expect(selectedFlow).toHaveProperty("project_name")
            expect(selectedFlow).toBe(mock_answer_ssr_aks_tfs)
        })
    })
    describe("Negative assertions", () => {
        it("should return a code of -1 when error occurs", async () => {
            MainWorker.prototype.ssr_aks_tfs = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(<CliResponse>{ok: false, code: -1, error: new Error("Something weird happened") as CliError});
            });
            let selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer_ssr_aks_tfs)
            expect(selectedFlow).toHaveProperty("ok")
            expect(selectedFlow.ok).toBe(false)
            expect(selectedFlow.error).toBeInstanceOf(Error)
            expect(selectedFlow.error).toHaveProperty("stack")
            expect(selectedFlow.error).toHaveProperty("message")
        })
    })
})

