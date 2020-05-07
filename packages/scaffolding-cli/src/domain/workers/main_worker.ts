import { CliAnswerModel } from '../model/prompt_answer'
import { CliResponse, CliError, TempCopy } from '../model/workers'
import { Utils } from './utils'
import { Replacetruct, buildReplaceFoldersAndVals, BuildReplaceInput } from '../config/file_mapper'
import { ssr, netcore, java_spring, csr, shared, netcore_selenium, gke_ssr, infra_aks, js_testcafe } from '../config/worker_maps'
import conf from '../config/static.config.json'
import { Static } from '../model/config'
import logger from 'simple-winston-logger-abstraction'

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
            logger.debug("in Node SSR AKS TFS Flow")
            logger.debug(instructions)
            let sharedBuildInput: Array<BuildReplaceInput> = shared.in_files({
                project_name: instructions.project_name,
                business_obj: instructions.business,
                cloud_obj: instructions.cloud,
                terraform_obj: instructions.terraform,
                scm_obj: instructions.source_control
            })

            let buildInput: Array<BuildReplaceInput> = ssr.in_files({
                project_name: instructions.project_name,
                business_obj: instructions.business,
                cloud_obj: instructions.cloud,
                terraform_obj: instructions.terraform,
                scm_obj: instructions.source_control
            }).concat(sharedBuildInput)

            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)

            await Utils.constructOutput(staticConf.ssr.folder_map, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput);

            await Utils.valueReplace(val_maps)
            logger.debug("FirstValReplace")
            await Utils.writeOutConfigFile(`${instructions.project_name}.bootstrap-config.json`, instructions)
            logger.debug("wrote out config file")
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.final_response_message(instructions.project_name, ssr.response_message(instructions.project_name), instructions.create_config)
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

            let sharedBuildInput: Array<BuildReplaceInput> = shared.in_files({
                project_name: instructions.project_name,
                business_obj: instructions.business,
                cloud_obj: instructions.cloud,
                terraform_obj: instructions.terraform,
                scm_obj: instructions.source_control
            })

            let buildInput: Array<BuildReplaceInput> = netcore.in_files({
                project_name: instructions.project_name,
                business_obj: instructions.business,
                cloud_obj: instructions.cloud
            }).concat(sharedBuildInput)

            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)
            // git clone node_repo custom app src
            // src_path_in_tmp should be statically defined in each method
            await Utils.doGitClone(staticConf.netcore.git_repo, new_directory.temp_path, staticConf.netcore.local_path, staticConf.netcore.git_ref)

            await Utils.constructOutput(staticConf.netcore.folder_map, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput)

            await Utils.valueReplace(val_maps)
            await Utils.fileNameReplace([`${new_directory.final_path}/src`, `${new_directory.final_path}/test`], instructions)
            await Utils.writeOutConfigFile(`${instructions.project_name}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.final_response_message(instructions.project_name, netcore.response_message(instructions.project_name), instructions.create_config)

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
            await Utils.fileNameReplace([new_directory.final_path], instructions)            

            await Utils.writeOutConfigFile(`${instructions.project_name}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.final_response_message(instructions.project_name, java_spring.response_message(instructions.project_name), instructions.create_config)

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

            await Utils.writeOutConfigFile(`${instructions.project_name}.bootstrap-config.json`, instructions)

            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.final_response_message(instructions.project_name, csr.response_message(instructions.project_name), instructions.create_config)
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

    async netcore_selenium_tfs(instructions: CliAnswerModel): Promise<CliResponse> {
        let selectedFlowResponse: CliResponse = <CliResponse>{}
        try {
            let buildInput: Array<BuildReplaceInput> = netcore_selenium.in_files(instructions.project_name, instructions.business, instructions.cloud)

            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)

            await Utils.constructOutput(staticConf.netcore_selenium.folder_map, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput);

            await Utils.valueReplace(val_maps)
            await Utils.fileNameReplace([`${new_directory.final_path}`], instructions)
            
            await Utils.writeOutConfigFile(`${instructions.project_name}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.final_response_message(instructions.project_name, netcore_selenium.response_message(instructions.project_name), instructions.create_config)

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
    async ssr_gke_tfs(instructions: CliAnswerModel): Promise<CliResponse> {
        let selectedFlowResponse: CliResponse = <CliResponse>{}
        try {

            let sharedBuildInput: Array<BuildReplaceInput> = shared.in_files({
                project_name: instructions.project_name,
                business_obj: instructions.business,
                cloud_obj: instructions.cloud,
                terraform_obj: instructions.terraform,
                scm_obj: instructions.source_control
            })

            let buildInput: Array<BuildReplaceInput> = gke_ssr.in_files({
                project_name: instructions.project_name,
                business_obj: instructions.business,
                cloud_obj: instructions.cloud,
                terraform_obj: instructions.terraform,
                scm_obj: instructions.source_control
            }).concat(sharedBuildInput)

            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)

            await Utils.constructOutput(staticConf.ssr_gke.folder_map, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput);

            await Utils.valueReplace(val_maps)
            
            await Utils.writeOutConfigFile(`${instructions.project_name}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.final_response_message(instructions.project_name, gke_ssr.response_message(instructions.project_name), instructions.create_config)

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
    async infra_aks_azdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        let selectedFlowResponse: CliResponse = <CliResponse>{}
        try {

            let buildInput: Array<BuildReplaceInput> = shared.in_files({
                project_name: instructions.project_name,
                business_obj: instructions.business,
                cloud_obj: instructions.cloud,
                terraform_obj: instructions.terraform,
                scm_obj: instructions.source_control
            })

            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)

            await Utils.constructOutput(staticConf.aks_infra.folder_map, new_directory.final_path, new_directory.temp_path)
            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput);

            await Utils.valueReplace(val_maps)
            
            await Utils.writeOutConfigFile(`${instructions.project_name}.bootstrap-config.json`, instructions, "-infra")
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.final_response_message(instructions.project_name, infra_aks.response_message(instructions.project_name), instructions.create_config)
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
    async js_testcafe_tfs(instructions: CliAnswerModel): Promise<CliResponse> {
        let selectedFlowResponse: CliResponse = <CliResponse>{}
        try {
            let buildInput: Array<BuildReplaceInput> = js_testcafe.in_files(instructions.project_name)

            let new_directory: TempCopy = await Utils.prepBase(instructions.project_name)

            await Utils.constructOutput(staticConf.js_testcafe.folder_map, new_directory.final_path, new_directory.temp_path)

            let val_maps: Array<Replacetruct> = buildReplaceFoldersAndVals(new_directory.final_path, buildInput);

            await Utils.valueReplace(val_maps)
            
            await Utils.writeOutConfigFile(`${instructions.project_name}.bootstrap-config.json`, instructions)

            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            
            // Control the output message from each method
            selectedFlowResponse.message = shared.final_response_message(instructions.project_name, js_testcafe.response_message(instructions.project_name), instructions.create_config)
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
