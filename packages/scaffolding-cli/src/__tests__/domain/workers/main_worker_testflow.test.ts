/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable compat/compat */
import {CliAnswerModel} from "../../../domain/model/prompt_answer"
import {CliResponse, BaseResponse} from "../../../domain/model/workers"
import {MainWorker} from "../../../domain/workers/main_worker"
import {Utils} from "../../../domain/workers/utils"
import { jsTestcafe, netcoreSelenium } from '../../../domain/config/worker_maps'

jest.mock("../../../domain/workers/utils")

const mockAnswer = {
    projectName: "testProjectName",
    projectType: "testProjectType",
    platform: "aks",
    deployment: "azdevops",
    business: {
        company: "testComp",
        domain: "testDomain",
        project: "testProject",
    },
} as CliAnswerModel

const mainWorker = new MainWorker()

const workerResponse = {
    message: `${mockAnswer.projectName} created`,
    ok: true,
} as BaseResponse

describe("mainWorker class", () => {
    describe("can bootstrap", () => {
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

        it("netcoreSeleniumTfs", async () => {
                const flowRan: CliResponse = await mainWorker.netcoreSeleniumTfs(
                    mockAnswer
                )

                expect(Utils.prepBase).toHaveBeenCalled()
                expect(Utils.valueReplace).toHaveBeenCalled()
                expect(Utils.constructOutput).toHaveBeenCalled()
                expect(Utils.fileNameReplace).toHaveBeenCalled()
                expect(Utils.writeOutConfigFile).toHaveBeenCalled()

                expect(flowRan.ok).toBe(true)
                expect(flowRan).toHaveProperty("message")
                expect(flowRan.message).toContain(netcoreSelenium.responseMessage(mockAnswer.projectName))
            },
        )

        it("jsTestcafeTfs", async () => {
            const flowRan: CliResponse = await mainWorker.jsTestcafeTfs(
                mockAnswer
            )

            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(Utils.writeOutConfigFile).toHaveBeenCalled()

            expect(flowRan.ok).toBe(true)
            expect(flowRan).toHaveProperty("message")
            expect(flowRan.message).toContain(jsTestcafe.responseMessage(mockAnswer.projectName))
        },
    )
    })
})
