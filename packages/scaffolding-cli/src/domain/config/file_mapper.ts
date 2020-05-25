// File Mapper
import {map, forEach, keys, forOwn, get, join} from "lodash"
import {resolve} from "path"
import {isObject, isString} from "util"
import {CliAnswerModel} from "../model/prompt_answer"

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
}

export interface Replacetruct {
    replaceFiles: Array<string>
    replaceVals: ReplaceValMap
    ignoreFiles?: Array<string>
    countMatches?: boolean
}

export function buildReplaceFoldersAndVals(
    basePath: string,
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
                {
                    replaceFiles: map(input.files, v => {
                        return resolve(basePath, v)
                    }),
                    replaceVals: {
                        from: new RegExp(val, "gi"),
                        to: input.values[val],
                    } as ReplaceValMap,
                } as Replacetruct,
            ]
        })
    })
    return replaceOutput
}

export function replaceGeneratedConfig(
    baseFile: string,
    replaceInput: CliAnswerModel,
    ignoreFiles?: Array<string>,
    countMatches?: boolean,
): Array<Replacetruct> {
    let replaceOutput: Array<Replacetruct> = new Array<Replacetruct>()
    const objectKeys: Array<string> = Object.keys(replaceInput)
    const cheatConfig: any = replaceInput as any
    // forEach(keys(replaceInput), (input: typeof keys CliAnswerModel) => {
    function closureStruct(
        replaceVal: string,
        propertyPath: string,
    ): Replacetruct {
        return {
            replaceFiles: [baseFile],
            replaceVals: {
                from: new RegExp(`replace_${replaceVal}`, "i"),
                to: get(cheatConfig, propertyPath),
            } as ReplaceValMap,
        } as Replacetruct
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
