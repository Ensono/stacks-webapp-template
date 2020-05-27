import {CliAnswerModel} from "../../../domain/model/prompt_answer"
import {CliResponse, BaseResponse} from "../../../domain/model/workers"
import {MainWorker} from "../../../domain/workers/main_worker"
import {Utils} from "../../../domain/workers/utils"
import conf from "../../../domain/config/static.config.json"
import {Static} from "../../../domain/model/config"
let staticConf: Static = conf as Static

jest.mock("../../../domain/workers/utils")

//TODO: parametise these tests

let mockAnswerSsr = {
    projectName: "foo",
    projectType: "ssr",
    platform: "aks",
    deployment: "tfs",
} as CliAnswerModel

let mockAnswerCsr = {
    projectName: "foo",
    projectType: "csr",
    platform: "aks",
    deployment: "tfs",
} as CliAnswerModel

let mockAnswerJavaSpring = {
    projectName: "foo",
    projectType: "javaSpring",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "testDomain",
        project: "javaSpring",
    },
} as CliAnswerModel

let mockAnswerNetcore = {
    projectName: "foo",
    projectType: "netcore",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "testDomain",
        project: "netcore",
    },
} as CliAnswerModel

let mockAnswerNetcoreSelenium = <CliAnswerModel>{
    projectName: "foo",
    projectType: "testNetcoreSelenium",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "testDomain",
        project: "netcore",
    },
}

let mockAnswerJsTestcafe = <CliAnswerModel>{
    projectName: "foo",
    projectType: "testJsTestcafe",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "jsTestcafe",
        project: "netcore",
    },
}

let workerResponse = <BaseResponse>{
    message: `${mockAnswerSsr.projectName} created`,
    ok: true,
}

let mainWorker = new MainWorker()
Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
    return Promise.resolve({})
})

describe("mainWorker class tests", () => {
    describe("Positive assertions", () => {
        beforeEach(async () => {})
        it("ssrAksTfs should return success and user message for npm", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mockAnswerSsr.projectName} created`,
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
            let flowRan: CliResponse = await mainWorker.ssrAksTfs(
                mockAnswerSsr,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flowRan).toHaveProperty("message")
            expect(flowRan).toHaveProperty("ok")
            expect(flowRan.ok).toBe(true)
            expect(flowRan.message).toMatch(`Created React SSR in`)
        })
        it("ssrGkeTfs should return success and user message for npm", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mockAnswerSsr.projectName} created`,
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
            let flow_ran: CliResponse = await mainWorker.ssrGkeTfs(
                mockAnswerSsr,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(
                `cd ${mockAnswerSsr.projectName}/src && npm install && npm run build && npm run start`,
            )
        })

        it("infraAksAzdevops should return success and user message for npm", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mockAnswerSsr.projectName} created`,
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
            let flow_ran: CliResponse = await mainWorker.infraAksAzdevops(
                mockAnswerSsr,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(
                `cd ${mockAnswerSsr.projectName}/deploy`,
            )
        })
        it("csrAksTfs should return success and user message for npm", async () => {
            Utils.doGitClone = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `foo`})
            })
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mockAnswerSsr.projectName} created`,
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

            let flow_ran: CliResponse = await mainWorker.csrAksTfs(
                mockAnswerCsr,
            )
            expect(Utils.doGitClone).toHaveBeenCalledWith(
                staticConf.csr.gitRepo,
                "/var/test",
                staticConf.csr.localPath,
                staticConf.csr.gitRef,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(
                `cd ${mockAnswerSsr.projectName}/src && npm install && npm run stuff`,
            )
        })
        it("netcoreAksTfs should return success and user message for npm", async () => {
            Utils.doGitClone = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `foo`})
            })
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mockAnswerSsr.projectName} created`,
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

            let flow_ran: CliResponse = await mainWorker.netcoreAksTfs(
                mockAnswerNetcore,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.doGitClone).toHaveBeenCalledWith(
                staticConf.netcore.gitRepo,
                "/var/test",
                staticConf.netcore.localPath,
                staticConf.netcore.gitRef,
            )
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(
                `cd ${mockAnswerSsr.projectName}/src`,
            )
            expect(flow_ran.message).toMatch(`dotnet clean && dotnet restore`)
        })
        it("javaSpringAksTfs should return success and user message for npm", async () => {
            Utils.doGitClone = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `foo`})
            })
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mockAnswerSsr.projectName} created`,
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

            let flow_ran: CliResponse = await mainWorker.javaSpringAksTfs(
                mockAnswerJavaSpring,
            )
            expect(Utils.doGitClone).toHaveBeenCalledWith(
                staticConf.javaSpring.gitRepo,
                "/var/test",
                staticConf.javaSpring.localPath,
                staticConf.javaSpring.gitRef,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(
                `cd ${mockAnswerSsr.projectName}/src`,
            )
            expect(flow_ran.message).toMatch(`gradle build && gradle run `)
        })
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

            let flow_ran: CliResponse = await mainWorker.netcoreSeleniumTfs(
                mockAnswerNetcoreSelenium,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(
                `cd ${mockAnswerNetcoreSelenium.projectName}`,
            )
            expect(flow_ran.message).toMatch(`dotnet restore && dotnet test`)
        })
    })

    it("jsTestcafeTfs should return success and user message for npm", async () => {
        Utils.prepBase = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve({
                message: `${mockAnswerJsTestcafe.projectName} created`,
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

        let flow_ran: CliResponse = await mainWorker.jsTestcafeTfs(
            mockAnswerJsTestcafe,
        )
        expect(Utils.prepBase).toHaveBeenCalled()
        expect(Utils.constructOutput).toHaveBeenCalled()
        expect(flow_ran).toHaveProperty("message")
        expect(flow_ran).toHaveProperty("ok")
        expect(flow_ran.ok).toBe(true)
        expect(flow_ran.message).toMatch(
            `cd ${mockAnswerJsTestcafe.projectName}`,
        )
        expect(flow_ran.message).toContain(`TestCafe`)
    })

    describe("Negative assertions", () => {
        it("ssr_aks_tfs should return a code of -1 when error occurs", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened")
            })
            let flow_ran: CliResponse = await mainWorker.ssrAksTfs(
                mockAnswerSsr,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("error")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(false)
            expect(flow_ran.error).toBeInstanceOf(Error)
            expect(flow_ran.error).toHaveProperty("stack")
            expect(flow_ran.error).toHaveProperty("message")
        }),
            it("netcore_aks_tfs should return a code of -1 when error occurs", async () => {
                Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                    throw new Error("Something weird happened")
                })
                let flow_ran: CliResponse = await mainWorker.netcoreAksTfs(
                    mockAnswerNetcore,
                )
                expect(Utils.prepBase).toHaveBeenCalled()
                expect(flow_ran).toHaveProperty("error")
                expect(flow_ran).toHaveProperty("ok")
                expect(flow_ran.ok).toBe(false)
                expect(flow_ran.error).toBeInstanceOf(Error)
                expect(flow_ran.error).toHaveProperty("stack")
                expect(flow_ran.error).toHaveProperty("message")
            }),
            it("javaSpringAksTfs should return a code of -1 when error occurs", async () => {
                Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                    throw new Error("Something weird happened")
                })
                let flow_ran: CliResponse = await mainWorker.javaSpringAksTfs(
                    mockAnswerJavaSpring,
                )
                expect(Utils.prepBase).toHaveBeenCalled()
                expect(flow_ran).toHaveProperty("error")
                expect(flow_ran).toHaveProperty("ok")
                expect(flow_ran.ok).toBe(false)
                expect(flow_ran.error).toBeInstanceOf(Error)
                expect(flow_ran.error).toHaveProperty("stack")
                expect(flow_ran.error).toHaveProperty("message")
            }),
            it("csr_aks_tfs should return a code of -1 when error occurs", async () => {
                Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                    throw new Error("Something weird happened")
                })
                let flow_ran: CliResponse = await mainWorker.csrAksTfs(
                    mockAnswerCsr,
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
