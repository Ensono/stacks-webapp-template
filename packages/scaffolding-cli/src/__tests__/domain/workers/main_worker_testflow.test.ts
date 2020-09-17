/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable compat/compat */
import { CliAnswerModel, JavaCliAnswerModel } from "../../../domain/model/prompt_answer"
import { CliResponse, BaseResponse } from "../../../domain/model/workers"
import { MainWorker } from "../../../domain/workers/main_worker"
import { Utils } from "../../../domain/workers/utils"
import { jsTestcafe, netcoreSelenium, javaSerenityTfs } from '../../../domain/config/worker_maps'

jest.mock("../../../domain/workers/utils")
jest.setTimeout(30000)
const mockAnswer = {
    projectName: "testProjectName",
    projectType: "ssr",
    platform: "aks",
    deployment: "azdevops",
    business: {
        company: "testComp",
        domain: "testDomain",
        project: "testProject",
    },
} as CliAnswerModel

const javaMockAnswer = {
    ...mockAnswer,
    javaspring: {
        namespace: "uk.co"
    }
} as JavaCliAnswerModel

const mainWorker = new MainWorker()

const workerResponse = {
    message: `${mockAnswer.projectName} created`,
    ok: true,
} as BaseResponse

describe("mainWorker class tests - Tests", () => {
    describe("Positive assertions", () => {
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
        })

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
        })

        it("javaSerenityTfs", async () => {
            const flowRan: CliResponse = await mainWorker.javaSerenityTfs(
                javaMockAnswer
            )

            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.valueReplace).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(Utils.fileNameReplace).toHaveBeenCalled()
            expect(Utils.writeOutConfigFile).toHaveBeenCalled()

            expect(flowRan.ok).toBe(true)
            expect(flowRan).toHaveProperty("message")
            expect(flowRan.message).toContain(javaSerenityTfs.responseMessage(javaMockAnswer.projectName))
        })
    })

    describe("Negative assertions", () => {
        it("netcoreSeleniumTfs", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened")
            })

            const flow_ran: CliResponse = await mainWorker.netcoreSeleniumTfs(
                mockAnswer,
            )

            expect(Utils.prepBase).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("error")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(false)
            expect(flow_ran.error).toBeInstanceOf(Error)
            expect(flow_ran.error).toHaveProperty("stack")
            expect(flow_ran.error).toHaveProperty("message")
        })

        it("jsTestcafeTfs", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened")
            })

            const flow_ran: CliResponse = await mainWorker.jsTestcafeTfs(
                mockAnswer,
            )

            expect(Utils.prepBase).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("error")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(false)
            expect(flow_ran.error).toBeInstanceOf(Error)
            expect(flow_ran.error).toHaveProperty("stack")
            expect(flow_ran.error).toHaveProperty("message")
        })

        it("javaSerenityTfs", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened")
            })

            const flow_ran: CliResponse = await mainWorker.javaSerenityTfs(
                javaMockAnswer,
            )

            expect(Utils.prepBase).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("error")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(false)
            expect(flow_ran.error).toBeInstanceOf(Error)
            expect(flow_ran.error).toHaveProperty("stack")
            expect(flow_ran.error).toHaveProperty("message")
        })
    })
})
