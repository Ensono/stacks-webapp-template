/// <reference types="jest" />
import { PromptAnswer } from '../../../domain/model/prompt_answer'
import { SsrAdoResponse, BaseResponse, TempCopy } from '../../../domain/model/workers'
import { Utils, copyFilter } from '../../../domain/workers/utils';

import * as fse from 'fs-extra'
import { FolderMap } from '../../../domain/config/file_mapper';
jest.mock('fs-extra')

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

let new_dir = "/var/test"

let worker_response = <SsrAdoResponse> {
    message: "success",
    ok: true
}

describe("utils class tests", () => {
    describe("Positive assertions", () => {
        it("copyWorker should return success", async () => {
            const mockCopy = jest.spyOn(fse, 'copy')
            let copy_ran: TempCopy = await Utils.prepBase(mock_answer.project_name)
            expect(mockCopy).toHaveBeenCalled()
            expect(copy_ran).toHaveProperty("message")
            expect(copy_ran).toHaveProperty("ok")
            expect(copy_ran).toHaveProperty("temp_path")
            expect(copy_ran).toHaveProperty("final_path")
            expect(copy_ran.ok).toBe(true)
            expect(copy_ran.message).toBe(`${mock_answer.project_name} created`)
        })
        it("moveWorker should return success", async () => {
            const mockMove = jest.spyOn(fse, 'move')
            let move_ran: BaseResponse = await Utils.constructOutput(ssr_tfs_aks, new_dir, "/tmp")
            expect(mockMove).toHaveBeenCalled()
            expect(mockMove).toHaveBeenCalledTimes(ssr_tfs_aks.length)
            expect(move_ran).toHaveProperty("message")
            expect(move_ran).toHaveProperty("ok")
            expect(move_ran.ok).toBe(true)
            expect(move_ran.message).toBe(`${new_dir} populated with relevant files`)
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
        it("copyWorker should return a code of ENOENT when error occurs", async () => {
            const mockCopy = jest.spyOn(fse, 'copy')
            mockCopy.mockImplementationOnce(() => {
                throw {code: "ENOENT", message: new Error("Something weird happened")}
            });
            let copy_ran = await Utils.prepBase(mock_answer.project_name)
            // expect(async () => { await Utils.copyWorker(mock_answer.project_name)}).rejects.toThrow(TempCopy)
            expect(mockCopy).toHaveBeenCalled()
            expect(copy_ran).toHaveProperty("code")
            expect(copy_ran.code).toBe("ENOENT")
            expect(copy_ran).toHaveProperty("error")
            expect(copy_ran.message).toBeInstanceOf(Error)
            expect(copy_ran.ok).toBe(false)
        })

        it("moveWorker should return a code of ENOENT when error occurs", async () => {
            const mockMove = jest.spyOn(fse, 'move')
            mockMove.mockImplementationOnce(() => {
                throw {code: "ENOENT", message: new Error("Something weird happened")}
            });
            let move_ran = await Utils.constructOutput(ssr_tfs_aks, new_dir, "/tmp")
            // expect(async () => { await Utils.copyWorker(mock_answer.project_name)}).rejects.toThrow(TempCopy)
            expect(mockMove).toHaveBeenCalled()
            expect(move_ran).toHaveProperty("code")
            expect(move_ran.code).toBe("ENOENT")
            expect(move_ran).toHaveProperty("error")
            expect(move_ran.message).toBeInstanceOf(Error)
            expect(move_ran.ok).toBe(false)
        })
    })
})

