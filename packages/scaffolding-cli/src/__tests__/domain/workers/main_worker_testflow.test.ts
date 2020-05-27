import {CliAnswerModel} from "../../../domain/model/prompt_answer"
import {CliResponse, BaseResponse} from "../../../domain/model/workers"
import {MainWorker} from "../../../domain/workers/main_worker"
import {Utils} from "../../../domain/workers/utils"

jest.mock("../../../domain/workers/utils")

let mockAnswerNetcoreSelenium = {
    projectName: "foo",
    projectType: "testNetcoreSelenium",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "testDomain",
        project: "netcore",
    },
} as CliAnswerModel

let mockAnswerJsTestcafe = {
    projectName: "foo",
    projectType: "testJsTestcafe",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "testDomain",
        project: "netcore",
    },
} as CliAnswerModel

let mainWorker = new MainWorker()

const mockProjectTypes: [string, CliAnswerModel][] = [
    [
        "dotnet restore && dotnet test",
        mockAnswerNetcoreSelenium],
    ["TestCafe", mockAnswerJsTestcafe],
]

Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
    return Promise.resolve({})
})

describe("mainWorker class", () => {
    describe("test flow happy paths", () => {
        beforeEach(async () => {})

        test.each(mockProjectTypes)(
            "test returns %p",
            async (outputMessage, mockAnswer) => {
                Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                    return Promise.resolve({
                        message: `${mockAnswer.projectName} created`,
                        tempPath: "/var/test",
                        finalPath: "/opt/myapp",
                    })
                })

                let workerResponse = {
                    message: `${mockAnswer.projectName} created`,
                    ok: true,
                } as BaseResponse

                Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                    return Promise.resolve(workerResponse)
                })

                Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                    return Promise.resolve(workerResponse)
                })

                Utils.fileNameReplace = jest.fn().mockImplementationOnce(() => {
                    return Promise.resolve(workerResponse)
                })

                let flowRan: CliResponse = await mainWorker.netcoreSeleniumTfs(
                    mockAnswer,
                )

                expect(Utils.prepBase).toHaveBeenCalled()
                expect(Utils.constructOutput).toHaveBeenCalled()
                expect(flowRan).toHaveProperty("message")
                expect(flowRan).toHaveProperty("ok")
                expect(flowRan.ok).toBe(true)
                expect(flowRan.message).toMatch(
                    `cd ${mockAnswer.projectName}`,
                )
                expect(flowRan.message).toMatch(outputMessage)
            },
        )
    })
})
