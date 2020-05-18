import { buildReplaceFoldersAndVals, Replacetruct, BuildReplaceInput, replaceGeneratedConfig  } from '../../../domain/config/file_mapper'
import { CliAnswerModel } from '../../../domain/model/prompt_answer'

let mock_answer_cli_answer = <CliAnswerModel>{
    project_name: "foo",
    project_type: "boo",
    platform: "az",
    deployment: "tfs",
    cloud: {
        region: "foo",
        resource_group: "bar"
    },
    terraform: {
        backend_storage: "blob/path"
    },
    business: {
        company: "faz",
        component: "baz",
        project: "fubar"
    },
    networking: {
        base_domain: "some.org"
    }
}
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
