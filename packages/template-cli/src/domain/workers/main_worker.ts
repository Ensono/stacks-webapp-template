import { CliAnswerModel } from '../model/prompt_answer'
import { SsrAdoResponse, CliError, TempCopy } from '../model/workers'
import { Utils } from './utils'
import { FolderMap, Replacetruct, buildReplaceFoldersAndVals, BuildReplaceInput } from '../config/file_mapper'
import {ssr, netcore, java_spring, csr } from '../config/worker_maps'
import * as staticConf from  '../config/static.confing.json'


export class MainWorker {
    /**
     * performs and entire templated out solution for the SSR AKS TFS deployment
     * @param {CliAnswerModel} instructions 
     * @returns 
     */
    async ssr_aks_tfs(instructions: CliAnswerModel): Promise<SsrAdoResponse> {
        let selectedFlowResponse: SsrAdoResponse = <SsrAdoResponse>{}
        try {
            let folder_maps: Array<FolderMap> = ssr.to_folders()

            let buildInput: Array<BuildReplaceInput> = ssr.in_files(instructions.project_name, instructions.business, instructions.cloud)

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
    async netcore_aks_tfs(instructions: CliAnswerModel): Promise<SsrAdoResponse> {
        let selectedFlowResponse: SsrAdoResponse = <SsrAdoResponse>{}
        try {
            let folder_maps: Array<FolderMap> = netcore.to_folders()

            let buildInput: Array<BuildReplaceInput> = netcore.in_files(instructions.project_name, instructions.business, instructions.cloud)
            
            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)
            // git clone node_repo custom app src
            // src_path_in_tmp should be statically defined in each method
            await Utils.doGitClone(staticConf.netcore.git_repo, new_directory.temp_path, 'src/netcore', staticConf.netcore.git_ref)

            await Utils.constructOutput(folder_maps, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput)

            await Utils.valueReplace(val_maps)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = 
`Your directory has been created, you can now: \n
---- \n
cd ${instructions.project_name}/src && export ASPNETCORE_ENVIRONMENT=Development && dotnet clean && dotnet restore && dotnet build && dotnet run \n
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
    async java_spring_aks_tfs(instructions: CliAnswerModel): Promise<SsrAdoResponse> {
        let selectedFlowResponse: SsrAdoResponse = <SsrAdoResponse>{}
        try {
            let folder_maps: Array<FolderMap> = java_spring.to_folders()

            let buildInput: Array<BuildReplaceInput> = java_spring.in_files(instructions.project_name, instructions.business, instructions.cloud)
            
            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)
            // git clone node_repo custom app src
            // src_path_in_tmp should be statically defined in each method
            await Utils.doGitClone(staticConf.java_spring.git_repo, new_directory.temp_path, 'src/java_spring', staticConf.java_spring.git_ref)

            await Utils.constructOutput(folder_maps, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput)

            await Utils.valueReplace(val_maps)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = 
`Your directory has been created, you can now: \n
---- \n
cd ${instructions.project_name}/src && export ASPNETCORE_ENVIRONMENT=Development && dotnet clean && dotnet restore && dotnet build && dotnet run \n
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
    async csr_aks_tfs(instructions: CliAnswerModel): Promise<SsrAdoResponse> {
        let selectedFlowResponse: SsrAdoResponse = <SsrAdoResponse>{}
        try {
            let folder_maps: Array<FolderMap> = csr.to_folders()

            let buildInput: Array<BuildReplaceInput> = csr.in_files(instructions.project_name, instructions.business, instructions.cloud)
            
            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)
            // git clone node_repo custom app src
            // src_path_in_tmp should be statically defined in each method
            await Utils.doGitClone(staticConf.csr.git_repo, new_directory.temp_path, 'src/cra', staticConf.csr.git_ref)

            await Utils.constructOutput(folder_maps, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput)

            await Utils.valueReplace(val_maps)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = 
`Your directory has been created, you can now: \n
---- \n
cd ${instructions.project_name}/src && npm install && npm run stuff \n
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
