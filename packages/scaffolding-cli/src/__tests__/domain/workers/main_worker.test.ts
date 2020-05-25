import {CliAnswerModel} from "../../../domain/model/prompt_answer"
import {CliResponse, BaseResponse} from "../../../domain/model/workers"
import {MainWorker} from "../../../domain/workers/main_worker"
import {Utils} from "../../../domain/workers/utils"
import conf from "../../../domain/config/static.config.json"
import {Static} from "../../../domain/model/config"
let staticConf: Static = conf as Static

jest.mock("../../../domain/workers/utils")

//TODO: parametise these tests

let mock_answer_ssr = <CliAnswerModel>{
    projectName: "foo",
    projectType: "ssr",
    platform: "aks",
    deployment: "tfs",
}

let mock_answer_csr = <CliAnswerModel>{
    projectName: "foo",
    projectType: "csr",
    platform: "aks",
    deployment: "tfs",
}

let mock_answer_java_spring = <CliAnswerModel>{
    projectName: "foo",
    projectType: "javaSpring",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "test_domain",
        project: "javaSpring",
    },
}

let mock_answer_netcore = <CliAnswerModel>{
    projectName: "foo",
    projectType: "netcore",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "test_domain",
        project: "netcore",
    },
}

let mock_answer_netcore_selenium = <CliAnswerModel>{
    projectName: "foo",
    projectType: "test_netcore_selenium",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "test_domain",
        project: "netcore",
    },
}

let mock_answer_js_testcafe = <CliAnswerModel>{
    projectName: "foo",
    projectType: "test_js_testcafe",
    platform: "aks",
    deployment: "tfs",
    business: {
        company: "testcomp",
        domain: "js_testcafe",
        project: "netcore",
    },
}

let worker_response = <BaseResponse>{
    message: `${mock_answer_ssr.projectName} created`,
    ok: true,
}

let mainWorker = new MainWorker()
Utils.writeOutConfigFile = jest.fn().mockImplementationOnce(() => {
    return Promise.resolve({})
})

describe("mainWorker class tests", () => {
    describe("Positive assertions", () => {
        beforeEach(async () => {})
        it("ssr_aks_tfs should return success and user message for npm", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mock_answer_ssr.projectName} created`,
                    tempPath: "/var/test",
                    finalPath: "/opt/myapp",
                })
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            let flowRan: CliResponse = await mainWorker.ssrAksTfs(
                mock_answer_ssr,
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
                    message: `${mock_answer_ssr.projectName} created`,
                    tempPath: "/var/test",
                    finalPath: "/opt/myapp",
                })
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            let flow_ran: CliResponse = await mainWorker.ssrGkeTfs(
                mock_answer_ssr,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(
                `cd ${mock_answer_ssr.projectName}/src && npm install && npm run build && npm run start`,
            )
        })

        it("infraAksAzdevops should return success and user message for npm", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mock_answer_ssr.projectName} created`,
                    tempPath: "/var/test",
                    finalPath: "/opt/myapp",
                })
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            let flow_ran: CliResponse = await mainWorker.infraAksAzdevops(
                mock_answer_ssr,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(
                `cd ${mock_answer_ssr.projectName}/deploy`,
            )
        })
        it("csr_aks_tfs should return success and user message for npm", async () => {
            Utils.doGitClone = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `foo`})
            })
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mock_answer_ssr.projectName} created`,
                    tempPath: "/var/test",
                    finalPath: "/opt/myapp",
                })
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })

            let flow_ran: CliResponse = await mainWorker.csrAksTfs(
                mock_answer_csr,
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
                `cd ${mock_answer_ssr.projectName}/src && npm install && npm run stuff`,
            )
        })
        it("netcore_aks_tfs should return success and user message for npm", async () => {
            Utils.doGitClone = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `foo`})
            })
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mock_answer_ssr.projectName} created`,
                    tempPath: "/var/test",
                    finalPath: "/opt/myapp",
                })
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.fileNameReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })

            let flow_ran: CliResponse = await mainWorker.netcoreAksTfs(
                mock_answer_netcore,
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
                `cd ${mock_answer_ssr.projectName}/src`,
            )
            expect(flow_ran.message).toMatch(`dotnet clean && dotnet restore`)
        })
        it("java_spring_aks_tfs should return success and user message for npm", async () => {
            Utils.doGitClone = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `foo`})
            })
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mock_answer_ssr.projectName} created`,
                    tempPath: "/var/test",
                    finalPath: "/opt/myapp",
                })
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })

            let flow_ran: CliResponse = await mainWorker.javaSpringAksTfs(
                mock_answer_java_spring,
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
                `cd ${mock_answer_ssr.projectName}/src`,
            )
            expect(flow_ran.message).toMatch(`gradle build && gradle run `)
        })
        it("netcoreSeleniumTfs should return success and user message for npm", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({
                    message: `${mock_answer_ssr.projectName} created`,
                    tempPath: "/var/test",
                    finalPath: "/opt/myapp",
                })
            })
            Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })
            Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })

            let flow_ran: CliResponse = await mainWorker.netcoreSeleniumTfs(
                mock_answer_netcore_selenium,
            )
            expect(Utils.prepBase).toHaveBeenCalled()
            expect(Utils.constructOutput).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toMatch(
                `cd ${mock_answer_netcore_selenium.projectName}`,
            )
            expect(flow_ran.message).toMatch(`dotnet restore && dotnet test`)
        })
    })

    it("js_testcafe_tfs should return success and user message for npm", async () => {
        Utils.prepBase = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve({
                message: `${mock_answer_ssr.projectName} created`,
                tempPath: "/var/test",
                finalPath: "/opt/myapp",
            })
        })
        Utils.constructOutput = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(worker_response)
        })
        Utils.valueReplace = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(worker_response)
        })

        let flow_ran: CliResponse = await mainWorker.jsTestcafeTfs(
            mock_answer_js_testcafe,
        )
        expect(Utils.prepBase).toHaveBeenCalled()
        expect(Utils.constructOutput).toHaveBeenCalled()
        expect(flow_ran).toHaveProperty("message")
        expect(flow_ran).toHaveProperty("ok")
        expect(flow_ran.ok).toBe(true)
        expect(flow_ran.message).toMatch(
            `cd ${mock_answer_js_testcafe.projectName}`,
        )
        expect(flow_ran.message).toContain(`TestCafe`)
    })

    describe("Negative assertions", () => {
        it("ssr_aks_tfs should return a code of -1 when error occurs", async () => {
            Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                throw new Error("Something weird happened")
            })
            let flow_ran: CliResponse = await mainWorker.ssrAksTfs(
                mock_answer_ssr,
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
                    mock_answer_netcore,
                )
                expect(Utils.prepBase).toHaveBeenCalled()
                expect(flow_ran).toHaveProperty("error")
                expect(flow_ran).toHaveProperty("ok")
                expect(flow_ran.ok).toBe(false)
                expect(flow_ran.error).toBeInstanceOf(Error)
                expect(flow_ran.error).toHaveProperty("stack")
                expect(flow_ran.error).toHaveProperty("message")
            }),
            it("java_spring_aks_tfs should return a code of -1 when error occurs", async () => {
                Utils.prepBase = jest.fn().mockImplementationOnce(() => {
                    throw new Error("Something weird happened")
                })
                let flow_ran: CliResponse = await mainWorker.javaSpringAksTfs(
                    mock_answer_java_spring,
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
                    mock_answer_csr,
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
