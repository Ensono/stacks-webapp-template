import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection } from "../../../../domain/model/prompt_answer"
import { netcore } from '../../../../domain/config/worker_maps'
import conf from  '../../../../domain/config/static.config.json'
import { Static, FolderMap } from '../../../../domain/model/config';
let staticConf: Static = conf as Static;


let projectName = "test-app-1"
let biz: BusinessSection = {
    company: "Test",
    project: "Testproj",
    component: "Test3",
    domain: "Domain"
}
let files: Array<BuildReplaceInput> = [
    {
        files: ["**/*.md"],
        values: {
            "PROJECT_NAME": projectName
        }
    },
    {
        files: ["**/*.cs", "**/*.sln", "**/Dockerfile", "**/*.csproj"],
        values: {
            "xxAMIDOxx": biz.company || "Company",
            "xxSTACKSxx": biz.project || "Project",
        }
    }
]


describe("netcore mapper tests", () => {
    it("netcore config should return an array of folders to map", () => {
        let test: Array<FolderMap> = staticConf.netcore.folderMap
        expect(test.length).toBe(13)
    }),
    it("in_files return an array of objects and cloud should be default", () => {
        let test: Array<BuildReplaceInput> = netcore.inFiles({ projectName: projectName, businessObj: biz})
        expect(test).toStrictEqual(files)
    })
})
