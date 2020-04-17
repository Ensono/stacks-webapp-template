import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection } from "../../../../domain/model/prompt_answer"
import { netcore } from '../../../../domain/config/worker_maps'
import conf from  '../../../../domain/config/static.config.json'
import { Static, FolderMap } from '../../../../domain/model/config';
let staticConf: Static = conf as Static;


let proj_name = "test-app-1"
let biz: BusinessSection = {
    company: "Test",
    project: "Testproj",
    component: "Test3"
}
let files: Array<BuildReplaceInput> = [
    {
        files: ["**/*.md"],
        values: {
            "PROJECT_NAME": "test-app-1"
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
        let test: Array<FolderMap> = staticConf.netcore.folder_map
        expect(test.length).toBe(10)
    }),
    it("in_files return an array of objects and cloud should be default", () => {
        let test: Array<BuildReplaceInput> = netcore.in_files(proj_name, biz)
        expect(test).toStrictEqual(files)
    })
})
