import { FlowSelector } from '../domain/selectors'
import { PromptAnswer } from '../domain/model/prompt_answer'
import { MainWorker } from '../domain/workers/main_worker'
import { CliError, SsrAdoResponse } from '../domain/model/workers'

let mock_answer = <PromptAnswer>{
    project_name: "foo",
    project_type: "boo",
    platform: "az",
    deployment: "tfs"
}

let worker_response = <SsrAdoResponse> {
    message: "success",
    ok: true
}



jest.mock('../domain/workers/main_worker')
let mainWorker = new MainWorker()
// , () => {
//     ssr_aks_tfs: jest.fn(() => {})
// })

describe("selector class tests", () => {

    describe("Positive assertions option_ssr_aks_azuredevops", () => {
        // let selectedFlow: object
        // beforeEach(async () => {
        //     selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer)
        // });
        it("should call the ssr_aks_tfs worker", async () => {
            MainWorker.prototype.ssr_aks_tfs = jest.fn().mockResolvedValue(mock_answer)
            let selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer)
            expect(MainWorker.prototype.ssr_aks_tfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.ssr_aks_tfs).toHaveBeenCalled()
        })
        it("should include the PromptAnswer keys", async () => {
            MainWorker.prototype.ssr_aks_tfs = jest.fn().mockResolvedValue(mock_answer)
            let selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer)
            expect(selectedFlow).toHaveProperty("project_name")
            expect(selectedFlow).toBe(mock_answer)
        })
    })
    // TODO: cli input test
    describe("Negative assertions", () => {
        it("should return a code of -1 when error occurs", async () => {
            MainWorker.prototype.ssr_aks_tfs = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(<SsrAdoResponse>{ok: false, code: -1, error: new Error("Something weird happened") as CliError});
            });
            let selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer)
            expect(selectedFlow).toHaveProperty("ok")
            expect(selectedFlow.ok).toBe(false)
            expect(selectedFlow.error).toBeInstanceOf(Error)
            expect(selectedFlow.error).toHaveProperty("stack")
            expect(selectedFlow.error).toHaveProperty("message")
        })
    })
})

