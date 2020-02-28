import { PromptAnswer } from '../../model/prompt_answer'
import { BaseResponse } from '../../model/workers'


const TEMPLATES_DIRECTORY = `../../../templates/`

export class Utils {
    static async copyWorker(directory_name: string): Promise<any> {
        let mockRes: BaseResponse = <BaseResponse>{}

        mockRes.ok = true
        mockRes.message = `${directory_name} created`
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
