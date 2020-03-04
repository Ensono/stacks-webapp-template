import { copy} from 'fs-extra'
import { BaseResponse } from '../model/workers'
import { resolve } from 'path'

const TEMPLATES_DIRECTORY = `../../../templates/`

export function copyFilter(src: string, dest: string) {
    // return true
    if (src.indexOf("node_modules") > -1 ||
        src.indexOf(".next") > -1 ||
        src.indexOf("coverage") > -1 ||
        src.indexOf("dist") > -1) {
        return false
    } else {
        return true
    }
}

export class Utils {
    static async copyWorker(directory_name: string): Promise<BaseResponse> {
        /**
         * Creates a directory if not present
         */
        let fsResponse: BaseResponse = <BaseResponse>{}
        try {
            await copy(resolve(__dirname, TEMPLATES_DIRECTORY), resolve(process.cwd(), directory_name), { filter: copyFilter })
            fsResponse.ok = true
            fsResponse.message =  `${directory_name} created`
        } catch(ex) {
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
        } finally {
            return fsResponse
        }
    }
}

export default {
    Utils,
    copyFilter
}
