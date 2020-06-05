import {runCli, runConfig} from "../../domain/prompt"
import * as prompt from "prompts"
import {resolve} from "path"
import {ExitMessage, CliOptions} from "../../domain/model/cli_response"
import {PromptAnswer} from "../../domain/model/prompt_answer"
import {FlowSelector} from "../../domain/selectors"
import {Utils} from "../../domain/workers/utils"

let cliArgs: CliOptions = <CliOptions>{
    _: ["run"],
}

let cliOptsConfigFileSsr: CliOptions = <CliOptions>{
    config: resolve(__dirname, "ssr.bootstrap-config.json"),
}

let mock_ssr_aks_tfs_answer = <PromptAnswer>{
    projectName: "test-app-1",
    projectType: "ssr",
    platform: "aks",
    deployment: "azdevops",
    businessCompany: "testcomp",
    businessDomain: "testDomain",
}

let mock_ssr_aks_tfs_answer_advanced = <PromptAnswer>{
    projectName: "test-app-1",
    projectType: "ssr",
    platform: "aks",
    deployment: "azdevops",
    businessCompany: "testcomp",
    businessDomain: "testDomain",
}

let mock_ssr_aks_tfs_answer_advanced_part_2 = <PromptAnswer>{
    cloudRegion: "uksouth",
}

jest.mock("../../domain/selectors")
jest.mock("../../domain/workers/utils")
jest.mock("prompts")

const mockPrompt = jest.spyOn(prompt, "prompt")

describe("prompt class tests", () => {
    describe("Positive assertions", () => {
        it("When run from config with absolute path should return an object with a code and message", async () => {
            FlowSelector.optionSsrAksAzuredevops = jest
                .fn()
                .mockImplementationOnce(() => {
                    return Promise.resolve({code: 0, message: ""})
                })

            let cliResult: ExitMessage = await runConfig(cliOptsConfigFileSsr)

            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
        it("When run from config with relative path should return an object with a code and message", async () => {
            FlowSelector.optionSsrAksAzuredevops = jest
                .fn()
                .mockImplementationOnce(() => {
                    return Promise.resolve({code: 0, message: ""})
                })
            cliOptsConfigFileSsr.configfile =
                "src/__tests__/domain/ssr.bootstrap-config.json"
            let cliResult: ExitMessage = await runConfig(cliOptsConfigFileSsr)

            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })

        it("When run from cli WITHOUT advanced config enabled should call prompt only 1x", async () => {
            FlowSelector.optionSsrAksAzuredevops = jest
                .fn()
                .mockImplementationOnce(() => {
                    return Promise.resolve({code: 0, message: ""})
                })
            mockPrompt.mockImplementationOnce(() => {
                return Promise.resolve(mock_ssr_aks_tfs_answer)
            })

            let cliResult: ExitMessage = await runCli("test", cliArgs)
            expect(mockPrompt).toHaveBeenCalled()
            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
        it("When run from cli WITH advanced config enabled should call prompt only 2x", async () => {
            FlowSelector.optionSsrAksAzuredevops = jest
                .fn()
                .mockImplementationOnce(() => {
                    return Promise.resolve({code: 0, message: ""})
                })
            Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({})
            })

            mockPrompt.mockClear()
            mockPrompt
                .mockImplementationOnce(() => {
                    return Promise.resolve(mock_ssr_aks_tfs_answer_advanced)
                })
                .mockImplementationOnce(() => {
                    return Promise.resolve(
                        mock_ssr_aks_tfs_answer_advanced_part_2,
                    )
                })

            let cliResult: ExitMessage = await runCli("test", cliArgs)
            expect(mockPrompt).toHaveBeenCalledTimes(2)
            expect(cliResult).toHaveProperty("code")
            expect(cliResult).toHaveProperty("message")
            expect(cliResult.code).toBe(0)
        })
    })
    describe("Negative assertions", () => {
        it("When run from config should return a response with an error code and an excpetion inside error", async () => {
            FlowSelector.optionSsrAksAzuredevops = jest
                .fn()
                .mockImplementationOnce(() => {
                    throw {
                        code: 127,
                        message: new Error("Something weird happened"),
                    }
                })
            let cliResult = await runConfig(cliOptsConfigFileSsr)
            expect(cliResult).toHaveProperty("code")
            expect(FlowSelector.optionSsrAksAzuredevops).toHaveBeenCalled()
            expect(cliResult.message).toHaveProperty("message")
            expect(cliResult.message).toBeInstanceOf(Error)
            expect(cliResult.message).toHaveProperty("stack")
            expect(cliResult.code).toBe(127)
        })
    })
})
