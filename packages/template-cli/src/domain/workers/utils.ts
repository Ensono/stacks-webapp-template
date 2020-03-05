import { copy, move, remove } from 'fs-extra'
import { tmpdir } from 'os'
import { BaseResponse, TempCopy } from '../model/workers'
import replace, { ReplaceInFileConfig } from 'replace-in-file'
import { resolve } from 'path'
import { FolderMap, Replacetruct } from '../config/file_mapper'
import logger from 'simple-winston-logger-abstraction'

const TEMPLATES_DIRECTORY = `../../../templates/`

export function copyFilter(src: string, dest: string) {
    if (src.indexOf("node_modules") > -1 ||
        src.indexOf(".next") > -1 ||
        src.indexOf("coverage") > -1 ||
        src.indexOf("dist") > -1) {
        return false
    } else {
        return true
    }
}

export async function asyncForEach(array: Array<any>, callback: any) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

export class Utils {

    public static async valueReplace(instruction_map: Array<Replacetruct>): Promise<BaseResponse> {
        let fsResponse: BaseResponse = <BaseResponse>{}
        try {
            // blanket copy templates out
            await asyncForEach(instruction_map, async (val: Replacetruct) => { //<{src: string, dest: string}>) => {
                let options: ReplaceInFileConfig = {
                    // files: resolve(base_path, val.replaceFiles[0]),
                    files: val.replaceFiles,
                    from: val.replaceVals.from,
                    to: val.replaceVals.to,
                    ignore: val.ignoreFiles,
                    countMatches: val.countMatches
                }
                let files_replaced = await replace(options)
                logger.debug(files_replaced)
            })
            fsResponse.ok = true
            fsResponse.message = 'replaced all occurences'
        }
        catch (ex) {
            logger.error(ex)
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
        }
        return fsResponse
    } 
    public static async constructOutput(instruction_map: Array<FolderMap>, new_directory: string, temp_directory: string): Promise<BaseResponse> {
        let fsResponse: BaseResponse = <BaseResponse>{}
        try {
            // blanket copy templates out
            await asyncForEach(instruction_map, async (val: FolderMap) => { //<{src: string, dest: string}>) => {
                // need to use copy as move first deletes the directory and tries to insert it
                // this will not work if you are moving a directory within the same parent
                await move(resolve(temp_directory, val.src), resolve(new_directory, val.dest), { overwrite: true })
            })
            // DELETE TEMP from this point on as we don't need it anymore
            await remove(temp_directory)

            fsResponse.ok = true
            fsResponse.message = `${new_directory} populated with relevant files`
            return fsResponse
        } catch (ex) {
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            return fsResponse
        }
    }
    public static async prepBase(directory_name: string): Promise<TempCopy> {
        /**
         * Creates a directory if not present
         */
        let fsResponse: TempCopy = <TempCopy>{}
        try {
            let new_directory: string = resolve(process.cwd(), directory_name)
            let temp_directory: string = resolve(tmpdir(), directory_name)
            // blanket copy templates out
            await copy(resolve(__dirname, TEMPLATES_DIRECTORY), temp_directory, { filter: copyFilter })

            fsResponse.ok = true
            fsResponse.message = `${directory_name} created`
            fsResponse.temp_path = temp_directory
            fsResponse.final_path = new_directory
            return fsResponse
        } catch (ex) {
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            return fsResponse
        }

    }
}

export default {
    Utils,
    copyFilter
}
