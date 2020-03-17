/// <reference types="jest" />
import { PromptAnswer } from '../../../domain/model/prompt_answer'
import { CliResponse, BaseResponse, TempCopy } from '../../../domain/model/workers'
import { Utils, copyFilter } from '../../../domain/workers/utils';
import * as fse from 'fs-extra'
import { Replacetruct } from '../../../domain/config/file_mapper';
import * as rif from 'replace-in-file'
import gitP, { SimpleGit } from 'simple-git/promise';
import { FolderMap } from '../../../domain/model/config';

jest.mock('fs-extra')
jest.mock('replace-in-file')
jest.mock('simple-git/promise', () => {
    const mGit = {
        checkout: jest.fn(),
        clone: jest.fn()
    };
    return jest.fn(() => mGit);
});

const mockCopy = jest.spyOn(fse, 'copy')

const mockMove = jest.spyOn(fse, 'move')

const mockReplace = jest.spyOn(rif, 'default')


let mock_answer = <PromptAnswer>{
    project_name: "foo",
    project_type: "boo",
    platform: "az",
    deployment: "tfs"
}

let ssr_tfs_aks: Array<FolderMap> = [
    { src: 'shared', dest: '' },
    { src: 'build/azDevops/azure', dest: 'build/azDevops/azure' },
    { src: 'deploy/azure/ssr', dest: 'deploy/azure' },
    { src: 'docs', dest: 'docs' },
    { src: 'src/ssr', dest: 'src' }
]

let temp_dir = "/tmp/my-app"
let new_dir = "/var/test"

let mock_vals: Array<Replacetruct> = [{ "replaceFiles": ["/some/dir/test-app-1/**/*.md"], "replaceVals": { "from": "foo", "to": "test-app-1" } }]

let worker_response = <CliResponse>{
    message: "success",
    ok: true
}

// let mockGit = gitP(temp_dir)

describe("utils class tests", () => {
    beforeEach(() => {
        mockCopy.mockClear()
        mockMove.mockClear()
        mockReplace.mockClear()
        // mockClone.mockClear()
    })
    describe("Positive assertions", () => {
        it("copyWorker should return success", async () => {
            let copy_ran: TempCopy = await Utils.prepBase(mock_answer.project_name)
            expect(mockCopy).toHaveBeenCalled()
            expect(copy_ran).toHaveProperty("message")
            expect(copy_ran).toHaveProperty("ok")
            expect(copy_ran).toHaveProperty("temp_path")
            expect(copy_ran).toHaveProperty("final_path")
            expect(copy_ran.ok).toBe(true)
            expect(copy_ran.message).toMatch(`${mock_answer.project_name} created`)
        })
        it("moveWorker should return success", async () => {
            let move_ran: BaseResponse = await Utils.constructOutput(ssr_tfs_aks, new_dir, "/tmp")
            expect(mockMove).toHaveBeenCalled()
            expect(mockMove).toHaveBeenCalledTimes(ssr_tfs_aks.length)
            expect(move_ran).toHaveProperty("message")
            expect(move_ran).toHaveProperty("ok")
            expect(move_ran.ok).toBe(true)
            expect(move_ran.message).toMatch(`${new_dir} populated with relevant files`)
        })
        it("valueReplace should return ok", async () => {
            let replace_ran: BaseResponse = await Utils.valueReplace(mock_vals)
            expect(mockReplace).toHaveBeenCalled()
            expect(mockReplace).toHaveBeenCalledTimes(mock_vals.length)
            expect(replace_ran).toHaveProperty("message")
            expect(replace_ran).toHaveProperty("ok")
            expect(replace_ran.ok).toBe(true)
            expect(replace_ran.message).toMatch(`replaced all occurences`)
        })
        it("writeOutConfigFile should return success", async () => {
            let move_ran: BaseResponse = await Utils.writeOutConfigFile("/tmp/foo.json", "my-app.config.json")
            expect(mockCopy).toHaveBeenCalled()
            expect(mockCopy).toHaveBeenCalledTimes(1)
            expect(move_ran).toHaveProperty("message")
            expect(move_ran).toHaveProperty("ok")
            expect(move_ran.ok).toBe(true)
            expect(move_ran.message).toMatch(`Sample config placed in current directory`)
        })

        it("doGitClone should return success", async () => {
            let git_ran: BaseResponse = await Utils.doGitClone("https://git.repo/sample.git", temp_dir, "src/sample-test", "1234234523ew0ew0j8ewr0u8ewr80")
            expect(gitP(temp_dir).clone).toHaveBeenCalledWith("https://git.repo/sample.git", `${temp_dir}/src/sample-test`, ["-n"])
            expect(gitP(temp_dir).checkout).toHaveBeenCalledWith("1234234523ew0ew0j8ewr0u8ewr80")
            expect(git_ran).toHaveProperty("message")
            expect(git_ran).toHaveProperty("ok")
            expect(git_ran.ok).toBe(true)
            expect(git_ran.message).toMatch("Git Cloned from repo and checked out on specified head")
        })

        it("copyFilter should return true for node_modules", () => {
            let processed: boolean = copyFilter("node_modules/foo", "/some/dir")
            expect(processed).toBe(false)
        })
        it("copyFilter should return false for none excluded dir", () => {
            let processed: boolean = copyFilter("user_code/foo", "/some/dir")
            expect(processed).toBe(true)
        })
    })
    describe("Negative assertions", () => {
        beforeEach(() => {
            mockCopy.mockClear()
            mockMove.mockClear()
            mockReplace.mockClear()
        })
        it("copyWorker should return a code of ENOENT when error occurs", async () => {
            mockCopy.mockImplementationOnce(() => {
                throw { code: "ENOENT", message: new Error("Something weird happened") }
            });
            let copy_ran = await Utils.prepBase(mock_answer.project_name)
            expect(mockCopy).toHaveBeenCalled()
            expect(copy_ran).toHaveProperty("code")
            expect(copy_ran.code).toBe("ENOENT")
            expect(copy_ran).toHaveProperty("error")
            expect(copy_ran.message).toBeInstanceOf(Error)
            expect(copy_ran.ok).toBe(false)
        })
        it("writeOutConfigFile should return a code of ENOENT when error occurs", async () => {
            mockCopy.mockImplementationOnce(() => {
                throw { code: "ENOENT", message: new Error("Something weird happened") }
            });
            let copy_ran = await Utils.writeOutConfigFile("/tmp/foo.json", "my-app.config.json")
            expect(mockCopy).toHaveBeenCalled()
            expect(copy_ran).toHaveProperty("code")
            expect(copy_ran.code).toBe("ENOENT")
            expect(copy_ran).toHaveProperty("error")
            expect(copy_ran.message).toBeInstanceOf(Error)
            expect(copy_ran.ok).toBe(false)
        })
        it("doGitClone should return a code when error occurs", async () => {
            gitP(temp_dir).clone = jest.fn().mockImplementationOnce(() => {
                throw { code: -127, message: new Error("Something weird happened") }
            });
            let git_ran: BaseResponse = await Utils.doGitClone("https://git.repo/sample.git", temp_dir, "src/sample-test", "1234234523ew0ew0j8ewr0u8ewr80")
            expect(git_ran).toHaveProperty("code")
            expect(git_ran.code).toBe(-127)
            expect(git_ran).toHaveProperty("error")
            expect(git_ran.ok).toBe(false)
        })
        it("moveWorker should return a code of ENOENT when error occurs", async () => {
            mockMove.mockImplementationOnce(() => {
                throw { code: "ENOENT", message: new Error("Something weird happened") }
            });
            let move_ran = await Utils.constructOutput(ssr_tfs_aks, new_dir, "/tmp")
            expect(mockMove).toHaveBeenCalled()
            expect(move_ran).toHaveProperty("code")
            expect(move_ran.code).toBe("ENOENT")
            expect(move_ran).toHaveProperty("error")
            expect(move_ran.message).toBeInstanceOf(Error)
            expect(move_ran.ok).toBe(false)
        })
        it("valueReplace returns a structured error object", async () => {
            mockReplace.mockImplementationOnce(() => {
                throw { code: "ENOENT", message: new Error("Something weird happened") }
            });
            let replace_ran: BaseResponse = await Utils.valueReplace(mock_vals)
            expect(mockReplace).toHaveBeenCalled()
            expect(replace_ran).toHaveProperty("code")
            expect(replace_ran.code).toBe("ENOENT")
            expect(replace_ran).toHaveProperty("error")
            expect(replace_ran.message).toBeInstanceOf(Error)
            expect(replace_ran.ok).toBe(false)
        })
    })
})

