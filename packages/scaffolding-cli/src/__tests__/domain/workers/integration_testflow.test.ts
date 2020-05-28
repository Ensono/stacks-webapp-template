import {promises, removeSync, ensureDirSync, emptyDirSync} from "fs-extra"
import path from "path"
import {CliAnswerModel} from "../../../domain/model/prompt_answer"
import {CliResponse} from "../../../domain/model/workers"
import {MainWorker} from "../../../domain/workers/main_worker"
import {jsTestcafe, netcoreSelenium} from "../../../domain/config/worker_maps"

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

// Todo: extra this out into test util
// Credit: https://gist.github.com/lovasoa/8691344#gistcomment-3299089
async function* walk(dir: string): AsyncGenerator<String> {
    for await (const d of await promises.opendir(dir)) {
        const entry = path.join(dir, d.name)
        if (d.isDirectory()) yield* await walk(entry)
        else if (d.isFile()) yield entry.replace(process.cwd(), "")
    }
}

describe("mainWorker class", () => {
    const currentDir = process.cwd()
    let tempDir: string

    beforeEach(() => {
        tempDir = path.join(__dirname, mockAnswer.projectName)
        try {
            ensureDirSync(tempDir)
            emptyDirSync(tempDir)
            process.chdir(tempDir)
        } catch (err) {
            console.log("chdir: " + err)
        }
    })

    afterEach(() => {
        process.chdir(currentDir)
        removeSync(tempDir)
    })

    it("netcoreSeleniumTfs with correct files", async () => {
        let results: String[] = []

        let flowRan: CliResponse = await mainWorker.netcoreSeleniumTfs(
            mockAnswer,
        )

        for await (const p of walk(tempDir)) results.push(p)

        expect(results).toMatchSnapshot()

        expect(flowRan.ok).toBe(true)
        expect(flowRan).toHaveProperty("message")

        expect(flowRan.message).toContain(
            netcoreSelenium.responseMessage(mockAnswer.projectName),
        )
    })

    it("jsTestcafe with correct files", async () => {
        let results: String[] = []

        let flowRan: CliResponse = await mainWorker.jsTestcafeTfs(mockAnswer)

        for await (const p of walk(tempDir)) results.push(p)

        expect(results).toMatchSnapshot()

        expect(flowRan.ok).toBe(true)
        expect(flowRan).toHaveProperty("message")

        expect(flowRan.message).toContain(
            jsTestcafe.responseMessage(mockAnswer.projectName),
        )
    })
})
