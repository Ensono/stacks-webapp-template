import * as cliPrompt from '../../domain/prompt'
import * as prompt from 'prompts'
import { resolve } from 'path'
import { ExitMessage } from '../../domain/model/cli_response'
import { PromptAnswer } from '../../domain/model/prompt_answer'
import { FlowSelector } from '../../domain/selectors'


let mock_ssr_aks_tfs_answer = <PromptAnswer>{
    project_name: "test-app-1",
    project_type: "ssr",
    platform: "aks",
    deployment: "azdevops"
}

let mock_ssr_aks_tfs_answer_advanced = <PromptAnswer>{
    project_name: "test-app-1",
    project_type: "ssr",
    platform: "aks",
    deployment: "azdevops",
    create_config: true,
    advanced_config: true
}

let mock_ssr_aks_tfs_answer_advanced_part_2 = <PromptAnswer>{
    cloud_region: "uksouth",
    cloud_resource_group: "my-test-rg"
}

jest.mock('../../domain/selectors')
jest.mock('prompts')

const mockPrompt = jest.spyOn(prompt, 'prompt')

describe("prompt class tests", () => {

    describe("Positive assertions", () => {
        it("When run from config with absolute path should return an object with a code and message", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({ code: 0, message: "" })
            });

            let cliResult: ExitMessage = await cliPrompt.runCli('test', [resolve(__dirname, 'test.bootstrap-config.json')])

            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
        it("When run from config with relative path should return an object with a code and message", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({ code: 0, message: "" })
            });

            let cliResult: ExitMessage = await cliPrompt.runCli('test', ['src/__tests__/domain/test.bootstrap-config.json'])

            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })

        it("When run from cli WITHOUT advanced config enabled should call prompt only 1x", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({ code: 0, message: "" })
            });
            mockPrompt.mockImplementationOnce(() => {
                return Promise.resolve(mock_ssr_aks_tfs_answer)
            });

            let cliResult: ExitMessage = await cliPrompt.runCli('test', [])
            expect(mockPrompt).toHaveBeenCalled()
            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
        it("When run from cli WITH advanced config enabled should call prompt only 2x", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({ code: 0, message: "" })
            });
            mockPrompt.mockClear()
            mockPrompt.mockImplementationOnce(() => {
                return Promise.resolve(mock_ssr_aks_tfs_answer_advanced)
            })
            .mockImplementationOnce(() => {
                return Promise.resolve(mock_ssr_aks_tfs_answer_advanced_part_2)
            });

            let cliResult: ExitMessage = await cliPrompt.runCli('test', [])
            expect(mockPrompt).toHaveBeenCalledTimes(2)
            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
    })
    describe("Negative assertions", () => {
        it("When run from config should return a response with an error code and an excpetion inside error", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                throw { code: 127, message: new Error("Something weird happened") };
            });
            let cliResult = await cliPrompt.runCli('test', [resolve(__dirname, 'test.bootstrap-config.json')])
            expect(cliResult).toHaveProperty("code")
            expect(FlowSelector.option_ssr_aks_azuredevops).toHaveBeenCalled()
            expect(cliResult.message).toHaveProperty("message")
            expect(cliResult.message).toBeInstanceOf(Error)
            expect(cliResult.message).toHaveProperty("stack")
            expect(cliResult.code).toBe(127)
        })

    })
})

