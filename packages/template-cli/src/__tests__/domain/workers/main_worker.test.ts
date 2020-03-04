import { PromptAnswer } from '../../../domain/model/prompt_answer'
import { SsrAdoResponse, BaseResponse } from '../../../domain/model/workers'
import { MainWorker } from '../../../domain/workers/main_worker';
import { Utils } from '../../../domain/workers/utils';
jest.mock('../../../domain/workers/utils')

let mock_answer = <PromptAnswer>{
    project_name: "foo",
    project_type: "boo",
    platform: "az",
    deployment: "tfs"
}

let worker_response = <BaseResponse> {
    message: `${mock_answer.project_name} created`,
    ok: true
}

let mainWorker = new MainWorker()
describe("mainWorker class tests", () => {

    describe("Positive assertions ssr_aks_tfs", () => {
        beforeEach(async () => {})
        it("should call the ssr_aks_tfs worker", async () => {
            Utils.copyWorker = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve({message: `${mock_answer.project_name} created`})
            })
            Utils.moveWorker = jest.fn().mockImplementationOnce(() => {
                return Promise.resolve(worker_response)
            })

            let flow_ran: SsrAdoResponse = await mainWorker.ssr_aks_tfs(mock_answer)
            expect(Utils.copyWorker).toHaveBeenCalled()
            expect(Utils.moveWorker).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("message")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(true)
            expect(flow_ran.message).toBe(`${mock_answer.project_name} created`)
        })
    })
    describe("Negative assertions", () => {
        it("ssr_aks_tfs should return a code of -1 when error occurs", async () => {
            Utils.copyWorker = jest.fn().mockImplementationOnce(() => {
                // throw <BaseResponse>{ok: false, code: -1, error: new Error("Something weird happened")};
                throw new Error("Something weird happened");
            });
            let flow_ran: SsrAdoResponse = await mainWorker.ssr_aks_tfs(mock_answer)
            expect(Utils.copyWorker).toHaveBeenCalled()
            expect(flow_ran).toHaveProperty("error")
            expect(flow_ran).toHaveProperty("ok")
            expect(flow_ran.ok).toBe(false)
            expect(flow_ran.error).toBeInstanceOf(Error)
            expect(flow_ran.error).toHaveProperty("stack")
            expect(flow_ran.error).toHaveProperty("message")
        })
    })
})

