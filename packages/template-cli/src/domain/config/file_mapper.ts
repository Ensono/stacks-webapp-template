import { map, forEach, keys } from 'lodash'
import { resolve } from 'path'

export enum BaseFlowType {
    BUILD = "build",
    SOURCE = "src",
    DEPLOY = "deploy",
    DOCS = "docs"   
}

export interface FileMapper {
    name: string,
    type: BaseFlowType
}

export interface ReplaceValMap {
    from: string | RegExp
    to: string
}

export interface BuildReplaceInputValues {
    [key: string]: string
}
export interface BuildReplaceInput {
    files: Array<string>
    values: BuildReplaceInputValues
    // [{files: ["README.md"], values: {find: "PROJECT_NAME", replace: instructions.project_name }}]
}
export interface FolderMap {
    src: string
    dest: string
}
export interface Replacetruct {
    replaceFiles: Array<string>
    replaceVals: ReplaceValMap
    ignoreFiles?: Array<string>
    countMatches?: boolean
}

export function buildReplaceFoldersAndVals(base_path: string, replaceInput: Array<BuildReplaceInput>, ignoreFiles?: Array<string>, countMatches?: boolean): Array<Replacetruct> {
    let replaceOutput: Array<Replacetruct> = new Array<Replacetruct>()
    
    forEach(replaceInput, (input: BuildReplaceInput) => {
        forEach(keys(input.values), val => {
            // Replacetruct
            replaceOutput = [...replaceOutput, <Replacetruct>{
                replaceFiles: map(input.files, (v) => {return resolve(base_path, v)}),
                replaceVals: <ReplaceValMap>{
                    from: new RegExp(val, 'gi'),
                    to: input.values[val]
                }
            }]
        });
    })
    return replaceOutput
}
