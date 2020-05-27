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

let workerResponse = {
    message: `${mockAnswerNetcoreSelenium.projectName} created`,
    ok: true,
} as BaseResponse

let mainWorker = new MainWorker()

Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
    return Promise.resolve({})
})

describe("mainWorker class", () => {
    describe("test flow happy paths", () => {
        beforeEach(async () => {})



        it("netcoreSeleniumTfs should return success and user message for npm", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mockAnswerNetcoreSelenium.projectName} created`,
                    tempPath: "/var/test",
                    finalPath: "/opt/myapp",
                })
            })
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
                mockAnswerNetcoreSelenium
            )
            console.log(`flowRan: ${flowRan.message}`)

            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flowRan).toHaveProperty("message")
            expect(flowRan).toHaveProperty("ok")
            expect(flowRan.ok).toBe(true)
            expect(flowRan.message).toMatch(
                `cd ${mockAnswerNetcoreSelenium.projectName}`,
            )
            expect(flowRan.message).toMatch(`dotnet restore && dotnet test`)
        })
    })
})
