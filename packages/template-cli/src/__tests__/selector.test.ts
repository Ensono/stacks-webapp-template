import { FlowSelector } from '../domain/selectors'
import { PromptAnswer } from '../domain/model/prompt_answer'
import { MainWorker } from '../domain/workers/main_worker'

let mock_answer = <PromptAnswer>{
    project_name: "foo",
    project_type: "boo",
    platform: "az",
    deployment: "tfs"
}

jest.mock('../domain/workers/main_worker')
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
            let selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer)
            expect(MainWorker.prototype.ssr_aks_tfs).toHaveBeenCalledTimes(1)
            expect(MainWorker.prototype.ssr_aks_tfs).toHaveBeenCalled()
            // expect(selectedFlow).toHaveProperty("project_name")
            // // expect(cliResult).toHaveProperty("message")
            // expect(selectedFlow).toBe(mock_answer)
        })
        it.skip("should include the PromptAnswer keys", async () => {
            let selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer)

            // let selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer)
            expect(selectedFlow).toHaveProperty("project_name")
            // expect(cliResult).toHaveProperty("message")
            expect(selectedFlow).toBe(mock_answer)
        })
    })
    // TODO: cli input test
    describe("Negative assertions", () => {
        it.skip("should return a code of 127 when excpetion is thrown", async () => {
            MainWorker.prototype.ssr_aks_tfs = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened");
            });
            let selectedFlow = await FlowSelector.option_ssr_aks_azuredevops(mock_answer)
            expect(MainWorker.prototype.ssr_aks_tfs).toHaveBeenCalled()

            // let cliResult = await prompt.runCli('test', [resolve(__dirname, 'sample.bootstrap-config.json')])
            // expect(cliResult).toHaveProperty("code")
            // expect(cliResult.message).toHaveProperty("message")
            // expect(cliResult.message).toBe("Something weird happened")
            // expect(cliResult.message).toHaveProperty("stack")
            // expect(cliResult.code).toBe(127)
        })
    })
})

