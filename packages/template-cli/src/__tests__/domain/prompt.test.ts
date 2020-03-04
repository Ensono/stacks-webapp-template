import * as prompt from '../../domain/prompt'
import { resolve } from 'path'
import { ExitMessage } from '../../domain/model/cli_response'
import { PromptAnswer } from '../../domain/model/prompt_answer'
import { FlowSelector }from '../../domain/selectors'


let mock_answer = <PromptAnswer>{
    project_name: "foo",
    project_type: "boo",
    platform: "az",
    deployment: "tfs"
}

jest.mock('../../domain/selectors')

describe("prompt class tests", () => {

    describe("Positive assertions when run from config", () => {
        it("should return an object with a code and message", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({code: 0, message: ""})
            });

            let cliResult: ExitMessage = await prompt.runCli('test', [resolve(__dirname, 'sample.bootstrap-config.json')])

            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
    })
    describe("Negative assertions", () => {
        it("should return a response with an error code and an excpetion inside error", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                throw {code: 127, message: new Error("Something weird happened")};
            });
            let cliResult = await prompt.runCli('test', [resolve(__dirname, 'sample.bootstrap-config.json')])
            expect(cliResult).toHaveProperty("code")
            expect(FlowSelector.option_ssr_aks_azuredevops).toHaveBeenCalled()
            expect(cliResult.message).toHaveProperty("message")
            expect(cliResult.message).toBeInstanceOf(Error)
            expect(cliResult.message).toHaveProperty("stack")
            expect(cliResult.code).toBe(127)
        })
    })
})

