import { copy, move, remove, ensureDir, rename, stat, readdir, Stats} from 'fs-extra'
import { tmpdir } from 'os'
import { startCase, toLower } from 'lodash'
import replace, { ReplaceInFileConfig } from 'replace-in-file'
import { resolve } from 'path'
import logger from 'simple-winston-logger-abstraction'
import gitP, { SimpleGit } from 'simple-git/promise';
import { Replacetruct, replaceGeneratedConfig } from '../config/file_mapper'
import { FolderMap } from '../model/config'
import { BaseResponse, TempCopy, ConfigResponse } from '../model/workers'
import { CliAnswerModel } from '../model/prompt_answer'

const TEMPLATES_DIRECTORY = `../../../templates/`

export function copyFilter(src: string, dest: string) {
    if (src.includes(".next") ||
        src.includes("coverage") ||
        src.includes(".terraform") ||
        src.includes("dist")) {
        return false
    } 
        return true
    
}

export async function asyncForEach(array: Array<any>, callback: any) {
    for (let index = 0; index < array.length; index += 1) {
        await callback(array[index], index, array) // eslint-disable-line no-await-in-loop
    }
}

export async function renamerRecursion(inPath: string, match: string | RegExp, replaceString: string ): Promise<void> {
    const files: Array<string> = await readdir(inPath)

    await asyncForEach(files, async (f: string) =>  {
        const path = resolve(inPath, f)
        const file: Stats = await stat(path)
        const newPath = resolve(inPath, f.replace(match, replaceString))
        await rename(path, newPath);
        if (file.isDirectory()) {
            await renamerRecursion(newPath, match, replaceString);
        }
    })
}

export class Utils {
    /**
     * git clone an entire public repo to use as a template
     * @param tempDirectory 
     * @param srcPathInTmp 
     * @param mono_repo_sub_folder_only 
     */
    public static async doGitClone(gitRepo: string, tempDirectory: string, srcPathInTmp: string, refVersion = "origin/master"): Promise<BaseResponse> {
        const gitResponse: BaseResponse = {} as BaseResponse
        try {
            const gitDir: string = resolve(tempDirectory, srcPathInTmp)
            await ensureDir(gitDir)
            const git: SimpleGit = gitP(gitDir)
            // clone without checkout
            await git.clone(gitRepo, gitDir, [`-n`])
            // checkout specific version - allow this to be versioned with cli releases
            // caller controls repo and ref
            await git.checkout(refVersion)
            gitResponse.ok = true
            gitResponse.message = "Git Cloned from repo and checked out on specified head"
            return gitResponse
        } catch (ex) {
            gitResponse.ok = false
            gitResponse.code = ex.code || -1
            gitResponse.message = ex.message
            gitResponse.error = ex.stack
            throw gitResponse
        }
    }

    public static async writeOutConfigFile(configOut: string, instructionMap?: CliAnswerModel, typeOverride = ""): Promise<ConfigResponse> {
        const fsResponse: ConfigResponse = {} as ConfigResponse
        try {
            const configFile: string = resolve(process.cwd(), configOut)
            const sampleConfig: string = resolve(__dirname, `../config/sample${typeOverride}.bootstrap-config.json`)
            await copy(sampleConfig, configFile, {preserveTimestamps: true, dereference: false})
            
            if (instructionMap) {
                const generatedConfig = replaceGeneratedConfig(configFile, instructionMap)
                await this.valueReplace(generatedConfig)
            }
            fsResponse.ok = true
            fsResponse.message = 'Sample config placed in current directory'
            fsResponse.configPath = configFile
            return fsResponse
        } catch (ex) {
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            throw fsResponse
        }
    }

    public static async fileNameReplace(srcDir: Array<string>, instructionMap: CliAnswerModel): Promise<BaseResponse> {
        const fsResponse: BaseResponse = {} as BaseResponse
        try {
            const replaceString = `${startCase(toLower(instructionMap.business.company))}.${startCase(toLower(instructionMap.business.project))}`
            const match = 'xxAMIDOxx.xxSTACKSxx'

            await asyncForEach(srcDir, async (dir: string) => {
                await renamerRecursion(dir, match, replaceString)
            })

            fsResponse.ok = true
            fsResponse.message = 'replaced all occurences'
            return fsResponse
        }
        catch (ex) {
            logger.error(ex.message)
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            throw fsResponse
        }
    }

    public static async valueReplace(instructionMap: Array<Replacetruct>): Promise<BaseResponse> {
        const fsResponse: BaseResponse = {} as BaseResponse
        try {
            // blanket copy templates out
            await asyncForEach(instructionMap, async (val: Replacetruct) => { // <{src: string, dest: string}>) => {
                const options: ReplaceInFileConfig = {
                    files: val.replaceFiles,
                    from: val.replaceVals.from,
                    to: val.replaceVals.to,
                    ignore: val.ignoreFiles,
                    allowEmptyPaths: true,
                    countMatches: val.countMatches
                }
                await replace(options)
            })
            fsResponse.ok = true
            fsResponse.message = 'replaced all occurences'
            return fsResponse
        }
        catch (ex) {
            logger.error(ex.message)
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            throw fsResponse
        }
    }

    public static async constructOutput(instructionMap: Array<FolderMap>, newDirectory: string, tempDirectory: string): Promise<BaseResponse> {
        const fsResponse: BaseResponse = {} as BaseResponse
        try {
            // blanket copy templates out
            await asyncForEach(instructionMap, async (val: FolderMap) => { // <{src: string, dest: string}>) => {
                // need to use copy as move first deletes the directory and tries to insert it
                // this will not work if you are moving a directory within the same parent
                await move(resolve(tempDirectory, val.src), resolve(newDirectory, val.dest), { overwrite: true })
            })
            // DELETE TEMP from this point on as we don't need it anymore
            await remove(tempDirectory)

            fsResponse.ok = true
            fsResponse.message = `${newDirectory} populated with relevant files`
            return fsResponse
        } catch (ex) {
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            await remove(tempDirectory)
            throw fsResponse
        }
    }

    public static async prepBase(directoryName: string): Promise<TempCopy> {
        /**
         * Creates a directory if not present
         */
        const fsResponse: TempCopy = {} as TempCopy
        try {
            const newDirectory: string = resolve(process.cwd(), directoryName)
            const tempDirectory: string = resolve(tmpdir(), directoryName)
            // precaution to make sure no files from previous run are polluting the process
            await remove(tempDirectory)
            // blanket copy templates out
            await copy(resolve(__dirname, TEMPLATES_DIRECTORY), tempDirectory, { filter: copyFilter })

            fsResponse.ok = true
            fsResponse.message = `${directoryName} created`
            fsResponse.tempPath = tempDirectory
            fsResponse.finalPath = newDirectory
            return fsResponse
        } catch (ex) {
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            throw fsResponse
        }
    }
}
