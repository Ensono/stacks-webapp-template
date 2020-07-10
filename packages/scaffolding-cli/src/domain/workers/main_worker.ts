/* eslint-disable class-methods-use-this */
import { startCase, toLower } from 'lodash'
import { CliAnswerModel, ProjectTypeEnum, JavaSection } from '../model/prompt_answer'
import { CliResponse, CliError, TempCopy, BaseResponse } from '../model/workers'
import { Utils } from './utils'
import { Replacetruct, buildReplaceFoldersAndVals, BuildReplaceInput } from '../config/file_mapper'
import { ssr, netcore, javaSpring, csr, shared, netcoreSelenium,
    gkeSsr, infraAks, jsTestcafe, gkeSsrJenkins, infraGke, infraGkeJenkins } from '../config/worker_maps'
import conf from '../config/static.config.json'
import { Static } from '../model/config'

const staticConf: Static = conf as Static;

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["ssrAksTfs", "infraAksAzdevops", "ssrGkeTfs", "netcoreSeleniumTfs", "csrAksTfs", "javaSpringAksTfs", "netcoreAksTfs", "jsTestcafeTfs"] }] */
export class MainWorker {
    /**
     * performs and entire templated out solution for the SSR AKS TFS deployment
     */
    async ssrAksTfs(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse

        try {
            const sharedBuildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            })

            const buildInput: Array<BuildReplaceInput> = ssr.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            }).concat(sharedBuildInput)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(staticConf.ssr.folderMap, newDirectory.finalPath, newDirectory.tempPath)

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput);

            await Utils.valueReplace(valMaps)
            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, ssr.responseMessage(instructions.projectName), instructions.enableAdvanced)
            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async netcoreAksTfs(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {

            const sharedBuildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            })

            const buildInput: Array<BuildReplaceInput> = netcore.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            }).concat(sharedBuildInput)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)
            // git clone node_repo custom app src
            // srcPathInTmp should be statically defined in each method
            await Utils.doGitClone(staticConf.netcore.gitRepo, newDirectory.tempPath, staticConf.netcore.localPath, staticConf.netcore.gitRef)

            await Utils.constructOutput([...staticConf.netcore.folderMap, ...staticConf.shared.folderMap], newDirectory.finalPath, newDirectory.tempPath)

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput)

            await Utils.valueReplace(valMaps)
            const replaceString = `${startCase(toLower(instructions.business.company)).replace(/\s/gm, "")}.${startCase(toLower(instructions.business.project)).replace(/\s/gm, "")}`
            await Utils.fileNameReplace([`${newDirectory.finalPath}/src`, `${newDirectory.finalPath}/test`], staticConf.netcore.searchValue as string, replaceString)
            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, netcore.responseMessage(instructions.projectName), instructions.enableAdvanced)

            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async javaSpringAksTfs(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {

            const sharedBuildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            })

            const buildInput: Array<BuildReplaceInput> = javaSpring.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking,
                javaspringObj: instructions[ProjectTypeEnum.JAVASPRING] as JavaSection
            }).concat(sharedBuildInput)

            // const buildInput: Array<BuildReplaceInput> = javaSpring.inFiles(instructions.projectName, instructions.business, instructions.cloud)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)
            // git clone node_repo custom app src
            // srcPathInTmp should be statically defined in each method
            await Utils.doGitClone(staticConf.javaSpring.gitRepo, newDirectory.tempPath, staticConf.javaSpring.localPath, staticConf.javaSpring.gitRef)

            await Utils.constructOutput(staticConf.javaSpring.folderMap, newDirectory.finalPath, newDirectory.tempPath)

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput)

            await Utils.valueReplace(valMaps)

            const replaceString = `${instructions[ProjectTypeEnum.JAVASPRING]?.namespace.replace(/\./gm, "/")}/${toLower(startCase(instructions.business.company)).replace(/\s/gm, "")}/${toLower(startCase(instructions.business.project)).replace(/\s/gm, "")}`
            await Utils.fileNameReplace([`${newDirectory.finalPath}/java/src/main/java`, `${newDirectory.finalPath}/java/src/test/java`], 
                (staticConf.javaSpring.searchValue as string).replace(/\./gm, "/"),
                replaceString, true)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, javaSpring.responseMessage(instructions.projectName), instructions.enableAdvanced)

            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async csrAksTfs(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {
            const sharedBuildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            })

            const buildInput: Array<BuildReplaceInput> = csr.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            }).concat(sharedBuildInput)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(staticConf.csr.folderMap, newDirectory.finalPath, newDirectory.tempPath)

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput)

            await Utils.valueReplace(valMaps)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)

            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, csr.responseMessage(instructions.projectName), instructions.enableAdvanced)
            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async netcoreSeleniumTfs(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {
            const buildInput: Array<BuildReplaceInput> = netcoreSelenium.inFiles(instructions.projectName, instructions.business, instructions.cloud)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(staticConf.netcoreSelenium.folderMap, newDirectory.finalPath, newDirectory.tempPath)

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput);

            await Utils.valueReplace(valMaps)
            const replaceString = `${startCase(toLower(instructions.business.company)).replace(/\s/gm, "")}.${startCase(toLower(instructions.business.project)).replace(/\s/gm, "")}`
            await Utils.fileNameReplace([`${newDirectory.finalPath}`], staticConf.netcoreSelenium.searchValue as string, replaceString)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, netcoreSelenium.responseMessage(instructions.projectName))

            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async ssrGkeTfs(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {

            const sharedBuildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking                
            })

            const buildInput: Array<BuildReplaceInput> = gkeSsr.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            }).concat(sharedBuildInput)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(staticConf.ssrGke.folderMap, newDirectory.finalPath, newDirectory.tempPath)

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput);

            await Utils.valueReplace(valMaps)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, gkeSsr.responseMessage(instructions.projectName), instructions.enableAdvanced)

            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async ssrGkeJenkins(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {

            const sharedBuildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            })

            const buildInput: Array<BuildReplaceInput> = gkeSsrJenkins.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            }).concat(sharedBuildInput)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(staticConf.ssrGkeJenkins.folderMap, newDirectory.finalPath, newDirectory.tempPath)

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput);

            await Utils.valueReplace(valMaps)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, gkeSsr.responseMessage(instructions.projectName), instructions.enableAdvanced)

            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async infraAksAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {

            const buildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            })

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(staticConf.aksInfra.folderMap, newDirectory.finalPath, newDirectory.tempPath)
            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput);

            await Utils.valueReplace(valMaps)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions, "-infra")
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, infraAks.responseMessage(instructions.projectName), instructions.enableAdvanced)
            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async infraGkeAzdevops(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {

            const sharedBuildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            })

            const buildInput: Array<BuildReplaceInput> = infraGke.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            }).concat(sharedBuildInput)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(staticConf.gkeInfra.folderMap, newDirectory.finalPath, newDirectory.tempPath)
            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput);

            await Utils.valueReplace(valMaps)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions, "-infra")
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, infraAks.responseMessage(instructions.projectName), instructions.enableAdvanced)
            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async infraGkeJenkins(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {

            const buildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            })

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(staticConf.gkeInfraJenkins.folderMap, newDirectory.finalPath, newDirectory.tempPath)
            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput);

            await Utils.valueReplace(valMaps)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions, "-infra")
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, infraAks.responseMessage(instructions.projectName), instructions.enableAdvanced)
            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }

    async jsTestcafeTfs(instructions: CliAnswerModel): Promise<CliResponse> {
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {
            const buildInput: Array<BuildReplaceInput> = jsTestcafe.inFiles(instructions.projectName)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(staticConf.jsTestcafe.folderMap, newDirectory.finalPath, newDirectory.tempPath)

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput);

            await Utils.valueReplace(valMaps)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)

            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true

            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, jsTestcafe.responseMessage(instructions.projectName))
            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse;
        }
    }
}

export default {
    MainWorker
}
