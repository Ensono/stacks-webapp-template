/* eslint-disable no-unused-expressions */
import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection, NetworkingSection, SourceControlSection, TerraformSection } from "../../../../domain/model/prompt_answer"
import { ssr } from '../../../../domain/config/worker_maps'
import conf from  '../../../../domain/config/config_handler'
import { Static, FolderMap } from '../../../../domain/model/config';

const staticConf: Static = conf as Static;

const projName = "test-app-1"

const biz = {
    company: "test",
    project: "test2",
    component: "test3",
    domain: "domain"
} as BusinessSection

const network = {
    baseDomain: "test.me.com"
} as NetworkingSection

const cloud = {
    region: "uksouth",
    resourceGroup: "my-rg"
} as CloudSection

const sourceControl = {
    repoName: "foo-git"
} as SourceControlSection

const terraform = {
    backendStorage: "azureBlob"
} as TerraformSection

const files: Array<BuildReplaceInput> = [
    {
        files: ["**/package.json"],
        values: {
            "project_name": projName
        }
    },
    {
        files: ["**/app-pipeline.yml"],
        values: {
            "domain: node": `domain: ${biz?.domain}`,
            "component: node": `domain: ${biz?.component}`,
            "src/ssr": "src",
            "nonprod.amidostacks.com": `${network.baseDomain}`,
            "amido-stacks-webapp": "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
            "tf_state_key: stacks-webapp": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_MY_APP%`,
            "deploy/azure/app/kube": "deploy/azure/app",
            "terraform_state_workspace: dev": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%",
            "docker_container_registry_name: amidostacksnonproduksnode": "docker_container_registry_name: REPLACE_ME_FOR_CONTAINER_REGISTRY",
            "amido-stacks-nonprod-uks-node": "REPLACE_ME_FOR_CLOUD_RESOURCE_NAME"
        }
    }
]

describe("ssr mapper tests", () => {
    it("to_folders return an array of objects", () => {
        const test: Array<FolderMap> = staticConf.ssr.folderMap
        expect(test.length).toBe(11)
    })
    it("in_files return an array of objects and cloud should be default", () => {
        const test: Array<BuildReplaceInput> = ssr.inFiles({ projectName: projName, businessObj: biz, networkObj: network, cloudObj: cloud, scmObj: sourceControl, terraformObj: terraform})
        expect(test).toStrictEqual(files)
    })
})
