import { PromptAnswer } from '../model/prompt_answer'
import { SsrAdoResponse, CliError, BaseResponse, TempCopy } from '../model/workers'
import { Utils, copyFilter } from './utils'
import { FolderMap, Replacetruct, buildReplaceFoldersAndVals, BuildReplaceInput } from '../config/file_mapper'
import logger from 'simple-winston-logger-abstraction'
import { fileURLToPath } from 'url'
import { ssr_aks_tfs_folder, ssr_aks_tfs_files } from '../config/worker_map'
const ssr_aks_azdevops = {}

export class MainWorker {
    /**
     * performs and entire templated out solution for the SSR AKS TFS deployment
     * @param {PromptAnswer} instructions 
     * @returns 
     */
    async ssr_aks_tfs<T>(instructions: PromptAnswer): Promise<SsrAdoResponse> {
        let selectedFlowResponse: SsrAdoResponse = <SsrAdoResponse>{}
        try {
            let folder_maps: Array<FolderMap> = ssr_aks_tfs_folder()

            let buildInput: Array<BuildReplaceInput> = ssr_aks_tfs_files(instructions.project_name, instructions.business, instructions.cloud)

            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)

            await Utils.constructOutput(folder_maps, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput)

            await Utils.valueReplace(val_maps)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            selectedFlowResponse.message = new_directory.message
            return selectedFlowResponse
        } catch (ex) {
            logger.error(ex)
            const cliErr = ex as CliError
            return <SsrAdoResponse>{
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            };
        }
    }
}

export default {
    MainWorker
}
