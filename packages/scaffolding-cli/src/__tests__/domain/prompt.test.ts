import { runCli, runConfig, generateSampleConfig } from '../../domain/prompt'
import * as prompt from 'prompts'
import { resolve } from 'path'
import { ExitMessage, CliOptions } from '../../domain/model/cli_response'
import { PromptAnswer } from '../../domain/model/prompt_answer'
import { FlowSelector } from '../../domain/selectors'
import { Utils } from '../../domain/workers/utils';

let cliOptsConfigFileSsr: CliOptions = <CliOptions>{
    configfile: resolve(__dirname, 'ssr.bootstrap-config.json')
}

let cliOptsInteractiveSsr: CliOptions = <CliOptions>{
    interactive: true
}

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
jest.mock('../../domain/workers/utils')
jest.mock('prompts')

const mockPrompt = jest.spyOn(prompt, 'prompt')

// Utils.writeOutConfigFile = jest.fn().mockImplementation(() => {
//     return Promise.resolve({})
// })
describe("prompt class tests", () => {

    describe("Positive assertions", () => {
        it("When run from config with absolute path should return an object with a code and message", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({ code: 0, message: "" })
            });

            let cliResult: ExitMessage = await runConfig(cliOptsConfigFileSsr)

            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
        it("When run from config with relative path should return an object with a code and message", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({ code: 0, message: "" })
            });
            cliOptsConfigFileSsr.configfile = 'src/__tests__/domain/ssr.bootstrap-config.json'
            let cliResult: ExitMessage = await runConfig(cliOptsConfigFileSsr)

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

            let cliResult: ExitMessage = await runCli('test', cliOptsInteractiveSsr)
            expect(mockPrompt).toHaveBeenCalled()
            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
        it("When run from cli WITH advanced config enabled should call prompt only 2x", async () => {
            FlowSelector.option_ssr_aks_azuredevops = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({ code: 0, message: "" })
            });
            Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({})
            })

            mockPrompt.mockClear()
            mockPrompt.mockImplementationOnce(() => {
                return Promise.resolve(mock_ssr_aks_tfs_answer_advanced)
            })
            .mockImplementationOnce(() => {
                return Promise.resolve(mock_ssr_aks_tfs_answer_advanced_part_2)
            });

            let cliResult: ExitMessage = await runCli('test', cliOptsInteractiveSsr)
            expect(mockPrompt).toHaveBeenCalledTimes(2)
            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
        it("When run with -gsc flag", async () => {
            Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({})
            })

            mockPrompt.mockClear()

            let cliResult: ExitMessage = await generateSampleConfig()
            expect(mockPrompt).not.toHaveBeenCalled()
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
            let cliResult = await runConfig(cliOptsConfigFileSsr)
            expect(cliResult).toHaveProperty("code")
            expect(FlowSelector.option_ssr_aks_azuredevops).toHaveBeenCalled()
            expect(cliResult.message).toHaveProperty("message")
            expect(cliResult.message).toBeInstanceOf(Error)
            expect(cliResult.message).toHaveProperty("stack")
            expect(cliResult.code).toBe(127)
        }),
        it("When sample config generation is run an error should be returned", async () => {
            Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
                throw { code: 127, message: new Error("Something weird happened") };
            });
            let cliResult = await generateSampleConfig()
            expect(cliResult).toHaveProperty("code")
            expect(Utils.writeOutConfigFile).toHaveBeenCalled()
            expect(cliResult.message).toHaveProperty("message")
            expect(cliResult.message).toBeInstanceOf(Error)
            expect(cliResult.message).toHaveProperty("stack")
            expect(cliResult.code).toBe(127)
        })
    })
})

