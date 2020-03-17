import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection } from "../../../../domain/model/prompt_answer"
import { ssr } from '../../../../domain/config/worker_maps'
import conf from  '../../../../domain/config/static.config.json'
import { Static, FolderMap } from '../../../../domain/model/config';
let staticConf: Static = conf as Static;
        
let proj_name = "test-app-1"
let biz: BusinessSection = {
    company: "test",
    project: "test2",
    component: "test3"
}
let files: Array<BuildReplaceInput> = [
    {
        files: ["**/*.md"],
        values: {
            "PROJECT_NAME": proj_name
        }
    },
    {
        files: ["**/*.yml"],
        values: {
            "amido-stacks-webapp": biz.company || "default",
            "replace_project_name": biz.project || "default",
            "replace_component_name": biz.component || "default",
            "replace_azure_location": "uksouth",
            "stacks-webapp-template/packages/template-cli/templates/src/ssr": "git_object?/src"
        }
    }
]

describe("ssr mapper tests", () => {
    it("to_folders return an array of objects", () => {
        let test: Array<FolderMap> = staticConf.ssr.folder_map
        expect(test.length).toBe(6)
    }),
    it("in_files return an array of objects and cloud should be default", () => {
        let test: Array<BuildReplaceInput> = ssr.in_files(proj_name, biz)
        expect(test).toStrictEqual(files)
    })
})
