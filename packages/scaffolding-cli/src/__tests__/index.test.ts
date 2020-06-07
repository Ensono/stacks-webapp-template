/**
 * Integration test
 */
import {ExitMessage} from "../domain/model/cli_response"
import * as cliPrompt from "../domain/prompt"
import {exec, ExecOptions} from "child_process"
import concat from "concat-stream"

jest.mock("../domain/prompt")
jest.mock("path")

function execute(processPath: string, opts: ExecOptions) {
    const execCli = exec(processPath, opts)
    let dataMe = ""
    return new Promise((resolve, reject) => {
        execCli.stdout?.on("data", (data: any) => {
            dataMe += data
        })

        execCli.stderr?.on("data", (err: any) => {
            reject(err.toString())
        })
        execCli.on("close", (code: number) => {
            resolve(dataMe)
        })
    })
}

describe.skip("Scaffolding CLI", () => {
    it("should return an ExitMessage as JSON object when called with a config ", async () => {
        const mockRunCli = jest.spyOn(cliPrompt, "runCli")
        mockRunCli.mockImplementationOnce(() => {
            return Promise.resolve({code: 0, message: "all good"})
        })
        mockRunCli.mockImplementationOnce(() => {
            return Promise.resolve({code: 0, message: ""})
        })
        let opts: ExecOptions = <ExecOptions>{
            cwd: __dirname,
            env: {LOG_LEVEL: "error", NODE_ENV: "development"},
        }
        const response = await execute(
            "$(which node) ../../dist/index.js ./domain/sample.bootstrap-config.json",
            opts,
        )

        expect(response).toBeTruthy()
    })
    afterEach(() => {})
})
