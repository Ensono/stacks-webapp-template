import {CliAnswerModel} from "../../../domain/model/prompt_answer"
import {CliResponse, BaseResponse} from "../../../domain/model/workers"
import {MainWorker} from "../../../domain/workers/main_worker"
import {Utils} from "../../../domain/workers/utils"
import {shared} from "../../../domain/config/worker_maps"

jest.mock("../../../domain/workers/utils")

let mockAnswer = {
    projectName: "testProjectName",
    projectType: "testProjectType",
    platform: "testPlatform",
    deployment: "testDeployment",
    business: {
        company: "testComp",
        domain: "testDomain",
        project: "testProject",
    },
} as CliAnswerModel

let mainWorker = new MainWorker()

let workerResponse = {
    message: `${mockAnswer.projectName} created`,
    ok: true,
} as BaseResponse

describe("mainWorker class", () => {
    describe("test flow happy paths", () => {
        beforeEach(async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mockAnswer.projectName} created`,
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

            Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(workerResponse)
            })
        })

        it("test bootsrap netcoreSeleniumTfs", async () => {
                let flowRan: CliResponse = await mainWorker.netcoreSeleniumTfs(
                    mockAnswer
                )

                expect(Utils.prepBase).toHaveBeenCalled()
                expect(Utils.constructOutput).toHaveBeenCalled()
                expect(flowRan).toHaveProperty("message")
                expect(flowRan).toHaveProperty("ok")
                expect(flowRan.ok).toBe(true)
                expect(flowRan.message).toContain(mockAnswer.projectName)
            },
        )

        it("test bootsrap jsTestcafeTfs", async () => {
            let flowRan: CliResponse = await mainWorker.jsTestcafeTfs(
                mockAnswer
            )

            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flowRan).toHaveProperty("message")
            expect(flowRan).toHaveProperty("ok")
            expect(flowRan.ok).toBe(true)
            expect(flowRan.message).toContain(mockAnswer.projectName)
        },
    )
    })
})
