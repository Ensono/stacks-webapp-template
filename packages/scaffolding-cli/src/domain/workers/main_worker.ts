/* eslint-disable class-methods-use-this */
import { startCase, toLower } from 'lodash'
import { CliAnswerModel, JavaCliAnswerModel, ProjectTypeEnum, JavaSection } from '../model/prompt_answer'
import { CliResponse, CliError, TempCopy } from '../model/workers'
import { Utils } from './utils'
import { Replacetruct, buildReplaceFoldersAndVals, BuildReplaceInput } from '../config/file_mapper'
import { ssr, netcore, javaSpringAksTfs, javaSpringAksJenkins, javaSerenityTfs, csr, shared, netcoreSelenium,
    gkeSsr, infraAks, jsTestcafe, gkeSsrJenkins, infraGke } from '../config/worker_maps'
import conf from '../config/static.config.json'
import { Static } from '../model/config'

const staticConf: Static = conf as Static;

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["ssrAksTfs", "infraAksAzdevops", "ssrGkeTfs", "netcoreSeleniumTfs", "csrAksTfs", "javaSpringAksTfs", "javaSpringAksJenkins", "netcoreAksTfs", "jsTestcafeTfs"] }] */
export class MainWorker {
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

            await Utils.doGitClone(staticConf.ssr.gitRepo, newDirectory.tempPath, staticConf.ssr.localPath, staticConf.ssr.gitRef)

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
            const fileNameReplacementPaths = staticConf.netcore.fileNameReplacementPaths?.map(path => `${newDirectory.finalPath}${path}`);
            await Utils.fileNameReplace(fileNameReplacementPaths || [], staticConf.netcore.searchValue as string, replaceString)
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

    async javaSpringAksTfs(instructions: JavaCliAnswerModel): Promise<CliResponse> {
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

            const buildInput: Array<BuildReplaceInput> = javaSpringAksTfs.inFiles({
                projectName: instructions.projectName,
                projectType: instructions.projectType,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking,
                javaspringObj: instructions[ProjectTypeEnum.JAVASPRING]
            }).concat(sharedBuildInput)

            let configName;
            switch (`${instructions.projectType}-${instructions.javaspring.testingFramework}`) {
                case "javaspring-serenity":
                    configName = "javaSpring";
                    break;
                case "javaspring-karate":
                    configName = "javaSpringKarate";
                    break;
                case "javaspringcqrs-serenity":
                    configName = "javaSpringCqrs";
                    break;
                case "javaspringcqrs-karate":
                    configName = "javaSpringCqrsKarate";
                    break;
                default:
                    configName = "javaSpring";
            }

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)
            // git clone node_repo custom app src
            // srcPathInTmp should be statically defined in each method
            await Utils.doGitClone(staticConf[configName].gitRepo, newDirectory.tempPath, staticConf[configName].localPath, staticConf[configName].gitRef)

            await Utils.constructOutput(
                staticConf[configName].folderMap,
                newDirectory.finalPath,
                newDirectory.tempPath,
            )

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(
                newDirectory.finalPath,
                buildInput,
            )

            await Utils.valueReplace(valMaps)

            const replaceString = `${instructions[ProjectTypeEnum.JAVASPRING].namespace.replace(/\./gm, "/")}/${toLower(startCase(instructions.business.company)).replace(/\s/gm, "")}/${toLower(startCase(instructions.business.project)).replace(/\s/gm, "")}`
            const fileNameReplacementPaths = staticConf[configName].fileNameReplacementPaths?.map(path => `${newDirectory.finalPath}${path}`);
            await Utils.fileNameReplace(fileNameReplacementPaths || [],
                (staticConf[configName].searchValue as string).replace(/\./gm, "/"),
                replaceString, true)
            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, javaSpringAksTfs.responseMessage(instructions.projectName), instructions.enableAdvanced)

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

    async javaSpringAksJenkins(instructions: JavaCliAnswerModel): Promise<CliResponse> {
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

            const buildInput: Array<BuildReplaceInput> = javaSpringAksJenkins.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking,
                javaspringObj: instructions[ProjectTypeEnum.JAVASPRING]
            }).concat(sharedBuildInput)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)
            // git clone node_repo custom app src
            // srcPathInTmp should be statically defined in each method
            await Utils.doGitClone(staticConf.javaSpringJenkins.gitRepo, newDirectory.tempPath, staticConf.javaSpringJenkins.localPath, staticConf.javaSpringJenkins.gitRef)

            await Utils.constructOutput(staticConf.javaSpringJenkins.folderMap, newDirectory.finalPath, newDirectory.tempPath)

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(newDirectory.finalPath, buildInput)

            await Utils.valueReplace(valMaps)

            const replaceString = `${instructions[ProjectTypeEnum.JAVASPRING].namespace.replace(/\./gm, "/")}/${toLower(startCase(instructions.business.company)).replace(/\s/gm, "")}/${toLower(startCase(instructions.business.project)).replace(/\s/gm, "")}`
            const fileNameReplacementPaths = staticConf.javaSpringJenkins.fileNameReplacementPaths?.map(path => `${newDirectory.finalPath}${path}`);
            await Utils.fileNameReplace(fileNameReplacementPaths || [],
                (staticConf.javaSpringJenkins.searchValue as string).replace(/\./gm, "/"),
                replaceString, true)

            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, javaSpringAksJenkins.responseMessage(instructions.projectName), instructions.enableAdvanced)

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

            await Utils.doGitClone(staticConf.csr.gitRepo, newDirectory.tempPath, staticConf.csr.localPath, staticConf.csr.gitRef)

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
            const fileNameReplacementPaths = staticConf.netcoreSelenium.fileNameReplacementPaths?.map(path => `${newDirectory.finalPath}${path}`);
            await Utils.fileNameReplace(fileNameReplacementPaths || [], staticConf.netcoreSelenium.searchValue as string, replaceString)

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

    async javaSerenityTfs(instructions: JavaCliAnswerModel): Promise<CliResponse> {
        const javaSerenityTfsConfig = staticConf.javaSerenityTfs
        const selectedFlowResponse: CliResponse = {} as CliResponse
        try {
            const buildInput: Array<BuildReplaceInput> = javaSerenityTfs.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                javaspringObj: instructions[ProjectTypeEnum.JAVASPRING]
            })

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.constructOutput(
                javaSerenityTfsConfig.folderMap,
                newDirectory.finalPath,
                newDirectory.tempPath,
            )

            const valMaps: Array<Replacetruct> = buildReplaceFoldersAndVals(
                newDirectory.finalPath,
                buildInput,
            )

            await Utils.valueReplace(valMaps)

            const replaceString = `${instructions[ProjectTypeEnum.JAVASPRING].namespace.replace(/\./gm, "/")}/${toLower(startCase(instructions.business.company)).replace(/\s/gm, "")}/${toLower(startCase(instructions.business.project)).replace(/\s/gm, "")}`
            const fileNameReplacementPaths = javaSerenityTfsConfig.fileNameReplacementPaths?.map(path => `${newDirectory.finalPath}${path}`);
            await Utils.fileNameReplace(
                fileNameReplacementPaths || [],
                (javaSerenityTfsConfig.searchValue as string).replace(/\./gm, "/"),
                replaceString,
                true, // Java Style Replacement
            )


            await Utils.writeOutConfigFile(`${instructions.projectName}.bootstrap-config.json`, instructions)
            selectedFlowResponse.code = 0
            selectedFlowResponse.ok = true
            // Control the output message from each method
            selectedFlowResponse.message = shared.finalResponseMessage(instructions.projectName, javaSerenityTfs.responseMessage(instructions.projectName))

            return selectedFlowResponse
        } catch (ex) {
            const cliErr = ex as CliError
            return {
                ok: false,
                code: ex.code || -1,
                message: ex.message,
                error: cliErr
            } as CliResponse
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

            await Utils.doGitClone(staticConf.ssrGke.gitRepo, newDirectory.tempPath, staticConf.ssrGke.localPath, staticConf.ssrGke.gitRef)

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

            const sharedBuildInput: Array<BuildReplaceInput> = shared.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            })

            const buildInput: Array<BuildReplaceInput> = infraAks.inFiles({
                projectName: instructions.projectName,
                businessObj: instructions.business,
                cloudObj: instructions.cloud,
                terraformObj: instructions.terraform,
                scmObj: instructions.sourceControl,
                networkObj: instructions.networking
            }).concat(sharedBuildInput)

            const newDirectory: TempCopy = await Utils.prepBase(instructions.projectName)

            await Utils.doGitClone(staticConf.aksInfra.gitRepo, newDirectory.tempPath, staticConf.aksInfra.localPath, staticConf.aksInfra.gitRef)

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
