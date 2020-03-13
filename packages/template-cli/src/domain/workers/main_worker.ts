import { CliAnswerModel } from '../model/prompt_answer'
import { SsrAdoResponse, CliError, TempCopy } from '../model/workers'
import { Utils } from './utils'
import { FolderMap, Replacetruct, buildReplaceFoldersAndVals, BuildReplaceInput } from '../config/file_mapper'
import { ssr_aks_tfs_folder, ssr_aks_tfs_files } from '../config/worker_map'

export class MainWorker {
    /**
     * performs and entire templated out solution for the SSR AKS TFS deployment
     * @param {CliAnswerModel} instructions 
     * @returns 
     */
    async ssr_aks_tfs(instructions: CliAnswerModel): Promise<SsrAdoResponse> {
        let selectedFlowResponse: SsrAdoResponse = <SsrAdoResponse>{}
        try {
            let folder_maps: Array<FolderMap> = ssr_aks_tfs_folder()
            // git clone node_repo
            let buildInput: Array<BuildReplaceInput> = ssr_aks_tfs_files(instructions.project_name, instructions.business, instructions.cloud)

            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)

            await Utils.constructOutput(folder_maps, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput)

            await Utils.valueReplace(val_maps)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = 
`Your directory has been created, you can now: \n
---- \n
cd ${instructions.project_name}/src && npm install && npm run build && npm run start \n
---- \n`
            return selectedFlowResponse
        } catch (ex) {
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
