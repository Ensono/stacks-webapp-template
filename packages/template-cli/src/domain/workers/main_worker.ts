import { PromptAnswer } from '../model/prompt_answer'
import { SsrAdoResponse, CliError, BaseResponse, TempCopy } from '../model/workers'
import { Utils, copyFilter } from './utils'
import { FolderMap, Replacetruct, buildReplaceFoldersAndVals, BuildReplaceInput } from '../config/file_mapper'
import logger from 'simple-winston-logger-abstraction'
import { fileURLToPath } from 'url'
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
            // TODO: this can be done better elsewhere in static definitions
            let folder_maps: Array<FolderMap> = [
                { src: 'shared', dest: '' },
                { src: 'build/azDevops/azure', dest: 'build/azDevops/azure' },
                { src: 'deploy/azure/ssr', dest: 'deploy/azure' },
                { src: 'docs', dest: 'docs' },
                { src: 'src/ssr', dest: 'src' }
            ]
            // TODO: this can be done elsewhere Further refactor this 
            let buildInput: Array<BuildReplaceInput> = [
                {
                    files: ["**/*.md"],
                    values: {
                        "PROJECT_NAME": instructions.project_name
                    }
                },
                {
                    files: ["**/vars.tf"],
                    values: {
                        "replace_company_name": instructions.business?.company || "default",
                        "replace_project_name": instructions.business?.project || "default",
                        "replace_component_name": instructions.business?.component || "default",
                        "replace_azure_location": instructions.cloud?.region || "uksouth"
                    }
                }
            ]

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
