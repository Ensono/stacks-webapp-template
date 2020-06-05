/* eslint-disable jest/no-try-expect */
/* eslint-disable compat/compat */
/* eslint-disable jest/no-disabled-tests */
/* eslint-disable @typescript-eslint/camelcase */
/// <reference types="jest" />
import * as fse from 'fs-extra'
import * as rif from 'replace-in-file'
import gitP, { SimpleGit } from 'simple-git/promise';
import { tmpdir } from 'os';
import { PromptAnswer, CliAnswerModel } from '../../../domain/model/prompt_answer'
import { CliResponse, BaseResponse, TempCopy } from '../../../domain/model/workers'
import { Utils, copyFilter, renamerRecursion } from '../../../domain/workers/utils';
import { Replacetruct } from '../../../domain/config/file_mapper';
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

const mockReplace = jest.spyOn(rif, 'replaceInFile')

const mockReaddir = jest.spyOn(fse, 'readdir')

const mockRename = jest.spyOn(fse, 'rename')

const mock_answer = {
    projectName: "foo",
    projectType: "boo",
    platform: "aks",
    deployment: "azdevops"
} as CliAnswerModel

const mock_cli_answer_model = {
    projectName: "foo",
    projectType: "boo",
    platform: "aks",
    deployment: "azdevops",
    business: {
        company: "company",
        component: "component",
        project: "project"
    }
} as CliAnswerModel

const ssr_tfs_aks: Array<FolderMap> = [
    { src: 'shared', dest: '' },
    { src: 'build/azDevops/azure', dest: 'build/azDevops/azure' },
    { src: 'deploy/azure/ssr', dest: 'deploy/azure' },
    { src: 'docs', dest: 'docs' },
    { src: 'src/ssr', dest: 'src' }
]

const temp_dir = "/tmp/my-app"
const new_dir = "/var/test"

const mock_vals: Array<Replacetruct> = [{ "replaceFiles": ["/some/dir/test-app-1/**/*.md"], "replaceVals": { "from": "foo", "to": "test-app-1" } }]

const worker_response = {
    message: "success",
    ok: true
} as CliResponse

describe("utils class tests", () => {
    beforeEach(() => {
        mockCopy.mockClear()
        mockMove.mockClear()
        mockReplace.mockClear()
    })
    describe("Positive assertions", () => {
        it("copyWorker should return success", async () => {
            const copy_ran: TempCopy = await Utils.prepBase(mock_answer.projectName)
            expect(mockCopy).toHaveBeenCalled()
            expect(copy_ran).toHaveProperty("message")
            expect(copy_ran).toHaveProperty("ok")
            expect(copy_ran).toHaveProperty("tempPath")
            expect(copy_ran).toHaveProperty("finalPath")
            expect(copy_ran.ok).toBe(true)
            expect(copy_ran.message).toMatch(`${mock_answer.projectName} created`)
        })
        it("moveWorker should return success", async () => {
            const move_ran: BaseResponse = await Utils.constructOutput(ssr_tfs_aks, new_dir, "/tmp")
            expect(mockMove).toHaveBeenCalled()
            expect(mockMove).toHaveBeenCalledTimes(ssr_tfs_aks.length)
            expect(move_ran).toHaveProperty("message")
            expect(move_ran).toHaveProperty("ok")
            expect(move_ran.ok).toBe(true)
            expect(move_ran.message).toMatch(`${new_dir} populated with relevant files`)
        })
        it("valueReplace should return ok", async () => {
            const replace_ran: BaseResponse = await Utils.valueReplace(mock_vals)
            expect(mockReplace).toHaveBeenCalled()
            expect(mockReplace).toHaveBeenCalledTimes(mock_vals.length)
            expect(replace_ran).toHaveProperty("message")
            expect(replace_ran).toHaveProperty("ok")
            expect(replace_ran.ok).toBe(true)
            expect(replace_ran.message).toMatch(`replaced all occurences`)
        })
        it("writeOutConfigFile should return success", async () => {
            const move_ran: BaseResponse = await Utils.writeOutConfigFile("/tmp/foo.json", mock_cli_answer_model)
            expect(mockCopy).toHaveBeenCalled()
            expect(mockCopy).toHaveBeenCalledTimes(1)
            expect(move_ran).toHaveProperty("message")
            expect(move_ran).toHaveProperty("ok")
            expect(move_ran.ok).toBe(true)
            expect(move_ran.message).toMatch(`Sample config placed in current directory`)
        })

        it("doGitClone should return success", async () => {
            const git_ran: BaseResponse = await Utils.doGitClone("https://git.repo/sample.git", temp_dir, "src/sample-test", "1234234523ew0ew0j8ewr0u8ewr80")
            expect(gitP(temp_dir).clone).toHaveBeenCalledWith("https://git.repo/sample.git", `${temp_dir}/src/sample-test`, ["-n"])
            expect(gitP(temp_dir).checkout).toHaveBeenCalledWith("1234234523ew0ew0j8ewr0u8ewr80")
            expect(git_ran).toHaveProperty("message")
            expect(git_ran).toHaveProperty("ok")
            expect(git_ran.ok).toBe(true)
            expect(git_ran.message).toMatch("Git Cloned from repo and checked out on specified head")
        })

        it.skip("fileNameReplace should return success", async () => {
            mockReaddir.mockImplementationOnce(() => {
                return Promise.resolve(["foo", "bar"])
            })

            const file_replacer_ran: BaseResponse = await Utils.fileNameReplace([tmpdir()], mock_cli_answer_model)
            expect(mockReaddir).toHaveBeenCalled()
            expect(file_replacer_ran).toHaveProperty("message")
            expect(file_replacer_ran).toHaveProperty("ok")
            expect(file_replacer_ran.ok).toBe(true)
            expect(file_replacer_ran.message).toMatch("replaced all occurences")
        })

        it("copyFilter should return true for dist", () => {
            const processed: boolean = copyFilter("some/dist/foo", "/some/dir")
            expect(processed).toBe(false)
        })
        it("copyFilter should return false for none excluded dir", () => {
            const processed: boolean = copyFilter("user_code/foo", "/some/dir")
            expect(processed).toBe(true)
        })

        it.skip("renamerRecursion should call readdir", async () => {
            const testPath = __dirname
            mockReaddir.mockImplementationOnce(() => {
                return Promise.resolve(["__foo.cs"])
            });
            await renamerRecursion(testPath, "__foo", "bar")
            expect(mockReaddir).toHaveBeenCalled()
            expect(mockRename).toHaveBeenCalledTimes(1)
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
                throw { code: "ENOENT", message: new Error("File Not found") }
            });
            try {
                await Utils.prepBase(mock_answer.projectName)
            } catch (ex) {
                expect(mockCopy).toHaveBeenCalled()
                expect(ex).toHaveProperty("code")
                expect(ex.code).toBe("ENOENT")
                expect(ex).toHaveProperty("error")
                expect(ex.message).toBeInstanceOf(Error)
                expect(ex.ok).toBe(false)
            }
        })
        it("writeOutConfigFile should return a code of ENOENT when error occurs", async () => {
            mockCopy.mockImplementationOnce(() => {
                throw { code: "ENOENT", message: new Error("Something weird happened") }
            });
            try {
                await Utils.writeOutConfigFile("/tmp/foo.json", mock_cli_answer_model)
            } catch (ex) {
                expect(mockCopy).toHaveBeenCalled()
                expect(ex).toHaveProperty("code")
                expect(ex).toHaveProperty("error")
                expect(ex.code).toBe("ENOENT")
                expect(ex.message).toBeInstanceOf(Error)
                expect(ex.ok).toBe(false)
            }
        })
        it("doGitClone should return a code when error occurs", async () => {
            gitP(temp_dir).clone = jest.fn().mockImplementationOnce(() => {
                throw { code: -127, message: new Error("Something weird happened") }
            });
            try {
                await Utils.doGitClone("https://git.repo/sample.git", temp_dir, "src/sample-test", "1234234523ew0ew0j8ewr0u8ewr80")
            } catch (ex) {
                expect(ex).toHaveProperty("code")
                expect(ex.code).toBe(-127)
                expect(ex).toHaveProperty("error")
                expect(ex.ok).toBe(false)
            }
        })
        it("moveWorker should return a code of ENOENT when error occurs", async () => {
            mockMove.mockImplementationOnce(() => {
                throw { code: "ENOENT", message: new Error("Something weird happened") }
            });
            try {
                await Utils.constructOutput(ssr_tfs_aks, new_dir, "/tmp")
            } catch (ex) {
                expect(mockMove).toHaveBeenCalled()
                expect(ex).toHaveProperty("code")
                expect(ex.code).toBe("ENOENT")
                expect(ex).toHaveProperty("error")
                expect(ex.message).toBeInstanceOf(Error)
                expect(ex.ok).toBe(false)
            }
        })
        it("valueReplace returns a structured error object", async () => {
            mockReplace.mockImplementationOnce(() => {
                throw { code: "ENOENT", message: new Error("Something weird happened") }
            });
            try {
                await Utils.valueReplace(mock_vals)
            } catch (ex) {
                expect(mockReplace).toHaveBeenCalled()
                expect(ex).toHaveProperty("code")
                expect(ex.code).toBe("ENOENT")
                expect(ex).toHaveProperty("error")
                expect(ex.message).toBeInstanceOf(Error)
                expect(ex.ok).toBe(false)
            }
        })
    })
})

