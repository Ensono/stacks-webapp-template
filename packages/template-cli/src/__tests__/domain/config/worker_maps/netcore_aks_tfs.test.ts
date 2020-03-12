import { FolderMap, BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection } from "../../../../domain/model/prompt_answer"
import { netcore } from '../../../../domain/config/worker_maps'

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
            "PROJECT_NAME": "test-app-1"
        }
    },
    {
        files: ["**/vars.tf"],
        values: {
            "replace_company_name": biz.company ,
            "replace_project_name": biz.project,
            "replace_component_name": biz.component,
            "replace_azure_location": "uksouth"
        }
    }
]

let folderMap: Array<FolderMap> = [
    { src: 'shared', dest: '' },
    { src: 'build/azDevops/azure', dest: 'build/azDevops/azure' },
    { src: 'deploy/azure/ssr', dest: 'deploy/azure' },
    { src: 'deploy/k8s', dest: 'deploy/k8s' },
    { src: 'docs', dest: 'docs' },
    { src: 'src/netcore/samples/aspnetcore/security', dest: 'src' }
]

describe("netcore mapper tests", () => {
    it("to_folders return an array of objects", () => {
        let test: Array<FolderMap> = netcore.to_folders()
        expect(test).toStrictEqual(folderMap)
        expect(test.length).toBe(6)
    }),
    it("in_files return an array of objects and cloud should be default", () => {
        let test: Array<BuildReplaceInput> = netcore.in_files(proj_name, biz)
        expect(test).toStrictEqual(files)
    })
})
