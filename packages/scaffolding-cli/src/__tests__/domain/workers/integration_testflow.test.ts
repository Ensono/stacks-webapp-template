/* eslint-disable no-restricted-syntax */
import { promises, remove, ensureDir, emptyDir } from "fs-extra"
import os from "os"
import path from "path"
import { CliAnswerModel } from "../../../domain/model/prompt_answer"
import { CliResponse } from "../../../domain/model/workers"
import { MainWorker } from "../../../domain/workers/main_worker"
import { jsTestcafe, netcoreSelenium } from "../../../domain/config/worker_maps"

const mockAnswer = {
    projectName: "testProjectName",
    projectType: "testjstestcafe",
    platform: "aks",
    deployment: "azdevops",
    business: {
        company: "testcomp",
        domain: "testDomain",
        project: "testProject",
    },
    sourceControl: {
        repoName: "test-repo"
    },
    networking: {
        baseDomain: "foo.me.org"
    },
    terraform: {
        backendStorage: "azureBlob"
    }
} as CliAnswerModel

const mainWorker = new MainWorker()

jest.setTimeout(30000)

// Todo: extra this out into test util
// Credit: https://gist.github.com/lovasoa/8691344#gistcomment-3299089
async function* walk(dir: string): AsyncGenerator<string> {
    for await (const d of await promises.opendir(dir)) {
        const entry = path.join(dir, d.name)
        if (d.isDirectory()) {
            yield* walk(entry)
        } else if (d.isFile()) {
            let file = entry.replace(process.cwd(), "")
            yield os.platform().toString() === 'win32' ?  file.replace(/\\/g, '/') : file
        }
    }
}

describe("mainWorker class", () => {
    const currentDir = process.cwd()
    let tempDir: string

    beforeEach(async () => {
        tempDir = path.join(__dirname, mockAnswer.projectName)
        try {
            await ensureDir(tempDir)
            await emptyDir(tempDir)
            process.chdir(tempDir)
        } catch (err) {
            console.log(`chdir: ${err}`)
        }
    })

    afterEach(async () => {
        process.chdir(currentDir)
        await remove(tempDir)
    })

    it("netcoreSeleniumTfs with correct files", async () => {
        const results: string[] = []

        const flowRan: CliResponse = await mainWorker.netcoreSeleniumTfs(
            mockAnswer,
        )

        for await (const p of walk(tempDir)) results.push(p)

        expect(results.sort()).toMatchSnapshot()

        expect(flowRan.ok).toBe(true)
        expect(flowRan).toHaveProperty("message")

        expect(flowRan.message).toContain(
            netcoreSelenium.responseMessage(mockAnswer.projectName),
        )
    })

    // temporarily disabling this test - TODO: find root cause.
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("jsTestcafe with correct files", async () => {
        const results: string[] = []

        const flowRan: CliResponse = await mainWorker.jsTestcafeTfs(mockAnswer)

        for await (const p of walk(tempDir)) results.push(p)

        expect(results.sort()).toMatchSnapshot()

        expect(flowRan.ok).toBe(true)
        expect(flowRan).toHaveProperty("message")

        expect(flowRan.message).toContain(
            jsTestcafe.responseMessage(mockAnswer.projectName),
        )
    })
})
