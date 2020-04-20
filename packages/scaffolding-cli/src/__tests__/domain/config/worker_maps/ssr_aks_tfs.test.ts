import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection } from "../../../../domain/model/prompt_answer"
import { ssr } from '../../../../domain/config/worker_maps'
import conf from  '../../../../domain/config/static.config.json'
import { Static, FolderMap } from '../../../../domain/model/config';
let staticConf: Static = conf as Static;
        
let proj_name = "test-app-1"
let biz: BusinessSection = <BusinessSection>{
    company: "test",
    project: "test2",
    component: "test3"
}
let cloud: CloudSection = <CloudSection>{
    region: "uksouth",
    resource_group: "my-rg"
}

let files: Array<BuildReplaceInput> = [
    {
        files: ["**/*.md", "**/package.json", "**/*.properties"],
        values: {
            "project_name": proj_name
        }
    },
    {
        files: ["**/*-pipeline.yml"],
        values: {
            "stacks-webapp-template/packages/scaffolding-cli/templates": "REPLACE_ME_FOR_REPO_NAME",
            "src/ssr": "src",
            "packages/scaffolding-cli/templates/": "",
            "amido-stacks-nonprod-node": "REPLACE_ME_FOR_RG_NAME",
            "amidostacksnonprodnode": "REPLACE_ME_FOR_ACR_NAME", // cloud_obj?.acr_name
            "nonprod.amidostacks.com": "REPLACE_ME_FOR_DOMAIN",
            "nonprod.amidostacks.internal": "REPLACE_ME_FOR_INTERNAL_DOMAIN",
            "amido-stacks-webapp": "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
            "amido-stacks-infra-credentials-nonprod": "REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES",
            "tf_state_key: sharedservices": "tf_state_key: REPLACE_ME_FOR_STATE_KEY",
            "deploy/azure/app/kube": "deploy/azure/app",
            "terraform_state_workspace: sharedservices": "terraform_state_workspace: REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE"
        }
    },
    {
        files: ["**/vars.tf"],
        values: {
            "replace_project_name": biz.project,
            "replace_component_name": biz.component,
            "replace_azure_location": "uksouth",
        }
    }
]

describe("ssr mapper tests", () => {
    it("to_folders return an array of objects", () => {
        let test: Array<FolderMap> = staticConf.ssr.folder_map
        expect(test.length).toBe(11)
    }),
    it("in_files return an array of objects and cloud should be default", () => {
        let test: Array<BuildReplaceInput> = ssr.in_files(proj_name, biz)
        expect(test).toStrictEqual(files)
    })
})
