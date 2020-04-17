import { copy, move, remove, ensureDir, rename, stat, readdir, Stats} from 'fs-extra'
import { tmpdir } from 'os'
import { startCase, toLower } from 'lodash'
import { BaseResponse, TempCopy, ConfigResponse } from '../model/workers'
import { FolderMap } from '../model/config'
import replace, { ReplaceInFileConfig } from 'replace-in-file'
import { resolve } from 'path'
import { Replacetruct, replaceGeneratedConfig } from '../config/file_mapper'
import logger from 'simple-winston-logger-abstraction'
import gitP, { SimpleGit } from 'simple-git/promise';
import { CliAnswerModel } from '../model/prompt_answer'

const TEMPLATES_DIRECTORY = `../../../templates/`

export function copyFilter(src: string, dest: string) {
    if (src.indexOf(".next") > -1 ||
        src.indexOf("coverage") > -1 ||
        src.indexOf(".terraform") > -1 ||
        src.indexOf("dist") > -1) {
        return false
    } else {
        return true
    }
}

export async function asyncForEach(array: Array<any>, callback: any) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

export async function renamerRecursion(in_path: string, match: string | RegExp, replace: string ): Promise<void> {

    let files: Array<string> = await readdir(in_path)

    await asyncForEach(files, async (f: string) =>  {
        let path = resolve(in_path, f)
        let file: Stats = await stat(path)
        let newPath = resolve(in_path, f.replace(match, replace))
        await rename(path, newPath);
        if (file.isDirectory()) {
            await renamerRecursion(newPath, match, replace);
        }
    })
}

export class Utils {
    /**
     * git clone an entire public repo to use as a template
     * @param temp_directory 
     * @param src_path_in_tmp 
     * @param mono_repo_sub_folder_only 
     */
    public static async doGitClone(git_repo: string, temp_directory: string, src_path_in_tmp: string, ref_version: string = "origin/master"): Promise<BaseResponse> {
        let gitResponse: BaseResponse = <BaseResponse>{}
        try {
            const gitDir: string = resolve(temp_directory, src_path_in_tmp)
            await ensureDir(gitDir)
            const git: SimpleGit = gitP(gitDir)
            // clone without checkout
            await git.clone(git_repo, gitDir, [`-n`])
            // checkout specific version - allow this to be versioned with cli releases
            // caller controls repo and ref
            await git.checkout(ref_version)
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
    public static async writeOutConfigFile(configOut: string, instruction_map?: CliAnswerModel): Promise<ConfigResponse> {
        let fsResponse: ConfigResponse = <ConfigResponse>{}
        try {
            let configFile: string = resolve(process.cwd(), configOut)
            let sampleConfig: string = resolve(__dirname, '../config/sample.bootstrap-config.json')
            await copy(sampleConfig, configFile, {preserveTimestamps: true, dereference: false})
            
            if (instruction_map) {
                await this.valueReplace(replaceGeneratedConfig(configFile, instruction_map))
            }
            fsResponse.ok = true
            fsResponse.message = 'Sample config placed in current directory'
            fsResponse.config_path = configFile
            return fsResponse
        } catch (ex) {
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            throw fsResponse
        }
    }
    public static async fileNameReplace(src_dir: string, instruction_map: CliAnswerModel): Promise<BaseResponse> {
        let fsResponse: BaseResponse = <BaseResponse>{}
        try {
            const replace: string = `${startCase(toLower(instruction_map.business.company))}.${startCase(toLower(instruction_map.business.project))}`
            const match: string = 'xxAMIDOxx.xxSTACKSxx'
            const dir: string = `${src_dir}/src`
            await renamerRecursion(dir, match, replace)

            fsResponse.ok = true
            fsResponse.message = 'replaced all occurences'
            return fsResponse
        }
        catch (ex) {
            logger.error(ex)
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            throw fsResponse
        }
    }

    public static async valueReplace(instruction_map: Array<Replacetruct>): Promise<BaseResponse> {
        let fsResponse: BaseResponse = <BaseResponse>{}
        try {
            // blanket copy templates out
            await asyncForEach(instruction_map, async (val: Replacetruct) => { //<{src: string, dest: string}>) => {
                let options: ReplaceInFileConfig = {
                    // files: resolve(base_path, val.replaceFiles[0]),
                    files: val.replaceFiles,
                    from: val.replaceVals.from,
                    to: val.replaceVals.to,
                    ignore: val.ignoreFiles,
                    countMatches: val.countMatches
                }
                await replace(options)
            })
            fsResponse.ok = true
            fsResponse.message = 'replaced all occurences'
            return fsResponse
        }
        catch (ex) {
            logger.error(ex)
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            throw fsResponse
        }
    } 
    public static async constructOutput(instruction_map: Array<FolderMap>, new_directory: string, temp_directory: string): Promise<BaseResponse> {
        let fsResponse: BaseResponse = <BaseResponse>{}
        try {
            // blanket copy templates out
            await asyncForEach(instruction_map, async (val: FolderMap) => { //<{src: string, dest: string}>) => {
                // need to use copy as move first deletes the directory and tries to insert it
                // this will not work if you are moving a directory within the same parent
                await move(resolve(temp_directory, val.src), resolve(new_directory, val.dest), { overwrite: true })
            })
            // DELETE TEMP from this point on as we don't need it anymore
            await remove(temp_directory)

            fsResponse.ok = true
            fsResponse.message = `${new_directory} populated with relevant files`
            return fsResponse
        } catch (ex) {
            fsResponse.ok = false
            fsResponse.code = ex.code || -1
            fsResponse.message = ex.message
            fsResponse.error = ex.stack
            await remove(temp_directory)
            throw fsResponse
        }
    }
    public static async prepBase(directory_name: string): Promise<TempCopy> {
        /**
         * Creates a directory if not present
         */
        let fsResponse: TempCopy = <TempCopy>{}
        try {
            let new_directory: string = resolve(process.cwd(), directory_name)
            let temp_directory: string = resolve(tmpdir(), directory_name)
            // precaution to make sure no files from previous run are polluting the process
            await remove(temp_directory)
            // blanket copy templates out
            await copy(resolve(__dirname, TEMPLATES_DIRECTORY), temp_directory, { filter: copyFilter })

            fsResponse.ok = true
            fsResponse.message = `${directory_name} created`
            fsResponse.temp_path = temp_directory
            fsResponse.final_path = new_directory
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
