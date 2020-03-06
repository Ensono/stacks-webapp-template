import { buildReplaceFoldersAndVals, Replacetruct, BuildReplaceInput  } from '../../../domain/config/file_mapper'

describe("file_mapper tests", () => {
    it("should return an array of objects", () => {
        let buildInput: Array<BuildReplaceInput> = [
            {
                files: ["**/*.md"],
                values: {
                    "PROJECT_NAME": "foo"
                }
            }
        ]
        let test: Array<Replacetruct> = buildReplaceFoldersAndVals("/var/test/output", buildInput)
        // expect(test).toBeInstanceOf(Array<SourceStruct>())
        expect(test.length).toBe(1)
    })
})
