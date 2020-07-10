/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/camelcase */
import { buildReplaceFoldersAndVals, Replacetruct, BuildReplaceInput, replaceGeneratedConfig  } from '../../../domain/config/file_mapper'
import { CliAnswerModel } from '../../../domain/model/prompt_answer'

const mock_answer_cli_answer = {
    projectName: "foo",
    projectType: "ssr",
    platform: "aks",
    deployment: "azdevops",
    cloud: {
        region: "foo",
        resourceGroup: "bar"
    },
    terraform: {
        backendStorage: "azureBlob"
    },
    business: {
        company: "faz",
        component: "baz",
        project: "fubar"
    },
    networking: {
        baseDomain: "some.org"
    }
} as CliAnswerModel

describe("file_mapper tests", () => {
    it("buildReplaceFoldersAndVals should return an array of objects", () => {
        let buildInput: Array<BuildReplaceInput> = [
            {
                files: ["**/*.md"],
                values: {
                    "PROJECT_NAME": "foo"
                }
            }
        ]
        let test: Array<Replacetruct> = buildReplaceFoldersAndVals("/var/test/output", buildInput)
        expect(test.length).toBe(1)
    })

    it("replaceGeneratedConfig should return an array of objects", () => {
        let test: Array<Replacetruct> = replaceGeneratedConfig("/var/test/output", mock_answer_cli_answer)
        expect(test.length).toBe(11)
    })
})
