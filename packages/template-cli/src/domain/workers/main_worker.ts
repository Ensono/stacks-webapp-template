import { CliAnswerModel } from '../model/prompt_answer'
import { CliResponse, CliError, TempCopy, ConfigResponse } from '../model/workers'
import { Utils } from './utils'
import { Replacetruct, buildReplaceFoldersAndVals, BuildReplaceInput, replaceGeneratedConfig } from '../config/file_mapper'
import {ssr, netcore, java_spring, csr } from '../config/worker_maps'
import conf from  '../config/static.config.json'
import { Static } from '../model/config'
import { resolve } from 'path'
import { response_message } from '../config/worker_maps/ssr_aks_tfs'

let staticConf: Static = conf as Static;

export class MainWorker {
    /**
     * performs and entire templated out solution for the SSR AKS TFS deployment
     * @param {CliAnswerModel} instructions 
     * @returns 
     */
    async ssr_aks_tfs(instructions: CliAnswerModel): Promise<CliResponse> {
        let selectedFlowResponse: CliResponse = <CliResponse>{}
        try {

            let buildInput: Array<BuildReplaceInput> = ssr.in_files(instructions.project_name, instructions.business, instructions.cloud)

            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)

            await Utils.constructOutput(staticConf.ssr.folder_map, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput)

            await Utils.valueReplace(val_maps)
            if (instructions.create_config) {
                await Utils.writeOutConfigFile(`${instructions.project_name}.bootstrap-config.json`, instructions)
            }
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = response_message(instructions.project_name)
            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return <CliResponse>{
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            };
        }
    }
    async netcore_aks_tfs(instructions: CliAnswerModel): Promise<CliResponse> {
        let selectedFlowResponse: CliResponse = <CliResponse>{}
        try {
            let buildInput: Array<BuildReplaceInput> = netcore.in_files(instructions.project_name, instructions.business, instructions.cloud)
            
            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)
            // git clone node_repo custom app src
            // src_path_in_tmp should be statically defined in each method
            await Utils.doGitClone(staticConf.netcore.git_repo, new_directory.temp_path, staticConf.netcore.local_path, staticConf.netcore.git_ref)

            await Utils.constructOutput(staticConf.netcore.folder_map, new_directory.final_path, new_directory.temp_path)

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
            return <CliResponse>{
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            };
        }
    }
    async java_spring_aks_tfs(instructions: CliAnswerModel): Promise<CliResponse> {
        let selectedFlowResponse: CliResponse = <CliResponse>{}
        try {

            let buildInput: Array<BuildReplaceInput> = java_spring.in_files(instructions.project_name, instructions.business, instructions.cloud)
            
            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)
            // git clone node_repo custom app src
            // src_path_in_tmp should be statically defined in each method
            await Utils.doGitClone(staticConf.java_spring.git_repo, new_directory.temp_path, staticConf.java_spring.local_path, staticConf.java_spring.git_ref)

            await Utils.constructOutput(staticConf.java_spring.folder_map, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput)

            await Utils.valueReplace(val_maps)

            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = 
`Your directory has been created, you can now: \n
---- \n
cd ${instructions.project_name}/src && gradle build && gradle run \n
---- \n`
            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return <CliResponse>{
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            };
        }
    }
    async csr_aks_tfs(instructions: CliAnswerModel): Promise<CliResponse> {
        let selectedFlowResponse: CliResponse = <CliResponse>{}
        try {

            let buildInput: Array<BuildReplaceInput> = csr.in_files(instructions.project_name, instructions.business, instructions.cloud)
            
            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)
            // git clone node_repo custom app src
            // src_path_in_tmp should be statically defined in each method
            await Utils.doGitClone(staticConf.csr.git_repo, new_directory.temp_path, staticConf.csr.local_path, staticConf.csr.git_ref)

            await Utils.constructOutput(staticConf.csr.folder_map, new_directory.final_path, new_directory.temp_path)

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
            return <CliResponse>{
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
