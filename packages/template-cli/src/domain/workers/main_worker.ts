import { PromptAnswer } from '../model/prompt_answer'
import { SsrAdoResponse, CliError, BaseResponse, TempCopy } from '../model/workers'
import { Utils, copyFilter } from './utils'
import { FolderMap } from '../config/file_mapper'

const ssr_aks_azdevops = {}

export class MainWorker {
    /**
     * @param {PromptAnswer} instructions 
     * @returns 
     */
    async ssr_aks_tfs<T>(instructions: PromptAnswer): Promise<SsrAdoResponse> {
        // let selectedFlowResponse: SsrAdoResponse;
        try {
            let ssr_tfs_aks: Array<FolderMap> = [
                { src: 'shared', dest: '' },
                { src: 'build/azDevops/azure', dest: 'build/azDevops/azure' },
                { src: 'deploy/azure/ssr', dest: 'deploy/azure' },
                { src: 'docs', dest: 'docs' },
                { src: 'src/ssr', dest: 'src' }
            ]

            let new_directory: TempCopy = await Utils.copyWorker(instructions.project_name)
            let moved_directory: BaseResponse = await Utils.moveWorker(ssr_tfs_aks, new_directory.final_path, new_directory.temp_path )
            moved_directory.code = 0
            moved_directory.message = new_directory.message
            return moved_directory
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
