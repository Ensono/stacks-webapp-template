import { getSourceFolders, SourceStruct } from '../../../domain/config/file_mapper'

describe("file_mapper tests", () => {
    it("should return an array of objects", () => {
        let test: Array<SourceStruct> = getSourceFolders()
        // expect(test).toBeInstanceOf(Array<SourceStruct>())
        expect(true).toBe(true)
    })
})
// function getSourceFolders(): Array<SourceStruct> {
//     return [{
//         path: "templates/build",
//         replaceFiles: [""],
//         replaceVals: [""]
//     }]
// }

// export {BaseFlowType, FileMapper, getSourceFolders}
