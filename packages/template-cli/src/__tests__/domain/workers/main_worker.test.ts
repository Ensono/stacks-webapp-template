import { PromptAnswer } from '../../../domain/model/prompt_answer'
import { SsrAdoResponse, BaseResponse } from '../../../domain/model/workers'
import { MainWorker, copyWorker } from '../../../domain/workers/main_worker';

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

jest.mock('fs-extra')
import { copy } from 'fs-extra'

let mainWorker = new MainWorker()

describe("mainWorker class tests", () => {

    describe("Positive assertions ssr_aks_tfs", () => {
        it("should call the ssr_aks_tfs worker", async () => {
            let flow_ran: SsrAdoResponse = await mainWorker.ssr_aks_tfs(mock_answer)
            expect(copy).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toBe("directory created")

        })
        it("should call the copyWorker worker", async () => {
            let copy_ran: BaseResponse = await copyWorker(mock_answer.project_name)
            expect(copy).toHaveBeenCalled()
            expect(copy_ran).toHaveProperty("message")
            expect(copy_ran).toHaveProperty("ok")
            expect(copy_ran.ok).toBe(true)
            expect(copy_ran.message).toBe("directory created")
        })
    })
    describe("Negative assertions", () => {
        it("should return a code of -1 when error occurs", async () => {
            
            // let flow_ran
        })
    })
})

