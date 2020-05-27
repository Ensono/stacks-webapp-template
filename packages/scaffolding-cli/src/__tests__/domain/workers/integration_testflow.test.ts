import {CliAnswerModel} from "../../../domain/model/prompt_answer"
import {CliResponse, BaseResponse} from "../../../domain/model/workers"
import {MainWorker} from "../../../domain/workers/main_worker"
import {Utils} from "../../../domain/workers/utils"
import {jsTestcafe, netcoreSelenium} from "../../../domain/config/worker_maps"
import {promises} from "fs"
import path from "path"

// afterAll(() => {
//     const path = ``

//     rmdir(path, err => {
//         if (err) {
//             console.error(err)
//             return
//         }
//     })
// })

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


// Credit: https://gist.github.com/lovasoa/8691344#gistcomment-3299089
async function* walk(dir: string): AsyncGenerator<String> {
    for await (const d of await promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* await walk(entry);
        else if (d.isFile()) yield entry;
    }
}

describe("mainWorker class", () => {
    describe("can bootstrap", () => {
        const outputPath = path.join(path.resolve(),mockAnswer.projectName)
        let results: String[] = []

        it("netcoreSeleniumTfs", async () => {
            // let flowRan: CliResponse = await mainWorker.netcoreSeleniumTfs(
            //     mockAnswer,
            // )

            for await (const p of walk(outputPath))
                results.push(p)

            expect(results).toMatchSnapshot()

            // expect(flowRan.ok).toBe(true)
            // expect(flowRan).toHaveProperty("message")

            // expect(flowRan.message).toContain(
            //     netcoreSelenium.responseMessage(mockAnswer.projectName),
            // )
        })
    })
})
