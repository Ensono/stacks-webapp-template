/// <reference types="jest" />
// import * from '@types/jest'
import { PromptAnswer } from '../../../domain/model/prompt_answer'
import { SsrAdoResponse, BaseResponse } from '../../../domain/model/workers'
import { Utils, copyFilter } from '../../../domain/workers/utils';
// import * as fse from 'fs-extra'
import * as fse from 'fs-extra'
jest.mock('fs-extra')

let mock_answer = <PromptAnswer>{
    project_name: "foo",
    project_type: "boo",
    platform: "az",
    deployment: "tfs"
}

let worker_response = <SsrAdoResponse> {
    message: "success",
    ok: true
}

describe("utils class tests", () => {
    describe("Positive assertions", () => {
        it("should call the copyWorker worker", async () => {
            const mockCopy = jest.spyOn(fse, 'copy')
            let copy_ran: BaseResponse = await Utils.copyWorker(mock_answer.project_name)
            expect(mockCopy).toHaveBeenCalled()
            expect(copy_ran).toHaveProperty("message")
            expect(copy_ran).toHaveProperty("ok")
            expect(copy_ran.ok).toBe(true)
            expect(copy_ran.message).toBe(`${mock_answer.project_name} created`)
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
        it("should return a code of -1 when error occurs", async () => {
            const mockCopy = jest.spyOn(fse, 'copy')
            mockCopy.mockImplementationOnce(() => {
                throw new Error("Something weird happened")
            });
            let copy_ran: BaseResponse = await Utils.copyWorker(mock_answer.project_name)
            expect(mockCopy).toHaveBeenCalled()
            expect(copy_ran).toHaveProperty("code")
            expect(copy_ran).toHaveProperty("error")
            expect(copy_ran.message).toBe("Something weird happened")
            expect(copy_ran.ok).toBe(false)

        })
    })
})

