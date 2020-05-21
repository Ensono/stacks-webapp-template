// File Mapper
import {map, forEach, keys, forOwn, get, join} from "lodash"
import {resolve} from "path"
import {CliAnswerModel} from "../model/prompt_answer"
import {isObject, isString} from "util"

export enum BaseFlowType {
    BUILD = "build",
    SOURCE = "src",
    DEPLOY = "deploy",
    DOCS = "docs",
}

export interface FileMapper {
    name: string
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

export interface Replacetruct {
    replaceFiles: Array<string>
    replaceVals: ReplaceValMap
    ignoreFiles?: Array<string>
    countMatches?: boolean
}

export function buildReplaceFoldersAndVals(
    base_path: string,
    replaceInput: Array<BuildReplaceInput>,
    ignoreFiles?: Array<string>,
    countMatches?: boolean,
): Array<Replacetruct> {
    let replaceOutput: Array<Replacetruct> = new Array<Replacetruct>()

    forEach(replaceInput, (input: BuildReplaceInput) => {
        forEach(keys(input.values), val => {
            // Replacetruct
            replaceOutput = [
                ...replaceOutput,
                <Replacetruct>{
                    replaceFiles: map(input.files, v => {
                        return resolve(base_path, v)
                    }),
                    replaceVals: <ReplaceValMap>{
                        from: new RegExp(val, "gi"),
                        to: input.values[val],
                    },
                },
            ]
        })
    })
    return replaceOutput
}

export function replaceGeneratedConfig(
    base_file: string,
    replaceInput: CliAnswerModel,
    ignoreFiles?: Array<string>,
    countMatches?: boolean,
): Array<Replacetruct> {
    let replaceOutput: Array<Replacetruct> = new Array<Replacetruct>()
    let objectKeys: Array<string> = Object.keys(replaceInput)
    let cheatConfig: any = replaceInput as any
    // forEach(keys(replaceInput), (input: typeof keys CliAnswerModel) => {
    function closureStruct(
        replaceVal: string,
        propertyPath: string,
    ): Replacetruct {
        return <Replacetruct>{
            replaceFiles: [base_file], // map(input.files, (v) => {return resolve(base_path, v)}),
            replaceVals: <ReplaceValMap>{
                from: new RegExp(`replace_${replaceVal}`, "i"),
                to: get(cheatConfig, propertyPath),
            },
        }
    }

    objectKeys.forEach((input: any) => {
        if (isObject(cheatConfig[input])) {
            Object.keys(cheatConfig[input]).forEach((deepKey: any) => {
                replaceOutput = [
                    ...replaceOutput,
                    closureStruct(`${input}_${deepKey}`, `${input}.${deepKey}`),
                ]
            })
        } else {
            replaceOutput = [...replaceOutput, closureStruct(input, input)]
        }
    })
    return replaceOutput
}
