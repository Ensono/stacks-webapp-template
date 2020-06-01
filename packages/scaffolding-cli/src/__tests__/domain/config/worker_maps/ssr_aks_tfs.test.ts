import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection } from "../../../../domain/model/prompt_answer"
import { ssr } from '../../../../domain/config/worker_maps'
import conf from  '../../../../domain/config/static.config.json'
import { Static, FolderMap } from '../../../../domain/model/config';
let staticConf: Static = conf as Static;
        
let projName = "test-app-1"
let biz: BusinessSection = <BusinessSection>{
    company: "test",
    project: "test2",
    component: "test3",
    domain: "domain"
}

let cloud: CloudSection = <CloudSection>{
    region: "uksouth",
    resourceGroup: "my-rg"
}

let files: Array<BuildReplaceInput> = [
    {
        files: ["**/package.json"],
        values: {
            "PROJECT_NAME": projName
        }
    },
    {
        files: ["**/*-pipeline.yml"],
        values: {
            "src/ssr": "src",
            "amido-stacks-webapp": "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
            "tf_state_key: stacks-webapp": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_MY_APP%`,
            "deploy/azure/app/kube": "deploy/azure/app",
            "terraform_state_workspace: dev": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%"
        }
    }
]

describe("ssr mapper tests", () => {
    it("to_folders return an array of objects", () => {
        let test: Array<FolderMap> = staticConf.ssr.folderMap
        expect(test.length).toBe(13)
    }),
    it("in_files return an array of objects and cloud should be default", () => {
        let test: Array<BuildReplaceInput> = ssr.inFiles({ projectName: projName, businessObj: biz})
        expect(test).toStrictEqual(files)
    })
})
