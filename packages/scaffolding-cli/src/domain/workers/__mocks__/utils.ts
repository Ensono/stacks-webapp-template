import { PromptAnswer } from '../../model/prompt_answer'
import { BaseResponse } from '../../model/workers'


const TEMPLATES_DIRECTORY = `../../../templates/`

export class Utils {
    static async copyWorker(directoryName: string): Promise<any> {
        let mockRes: BaseResponse = {} as BaseResponse

        mockRes.ok = true
        mockRes.message = `${directoryName} created`
        try {
            return await jest.fn((): BaseResponse => <BaseResponse>{ok: true, message: "fooo"})
        } catch (ex) {
            return ex;
        } 
    }
}


export default {
    Utils
}
