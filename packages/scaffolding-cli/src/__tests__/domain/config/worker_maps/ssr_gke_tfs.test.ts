/* eslint-disable no-unused-expressions */
import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection, NetworkingSection, SourceControlSection, TerraformSection } from "../../../../domain/model/prompt_answer"
import { gkeSsr } from '../../../../domain/config/worker_maps'
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
            "src/ssr": "src",
            "amido-stacks-webapp": "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
            "tf_state_key: node-app": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_MY_APP%`,
            "deploy/gcp/app/kube": "deploy/gcp/app",
            "terraform_state_workspace: dev": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%",
            "gke.nonprod.amidostacks.com": `${network?.baseDomain}`,
            "gcp_region: europe-west2": "gcp_region: %REPLACE_ME_FOR_REGION%",
            "gcp_project_name: amido-stacks": "gcp_project_name: %REPLACE_ME_FOR_REGION%",
            "gcp_project_id: amido-stacks": "gcp_project_id: %REPLACE_ME_FOR_PROJECT_ID%",
            "gcp_cluster_name: amido-stacks-nonprod-gke-infra": "gcp_cluster_name: %REPLACE_ME_FOR_CLUSTER_NAME%"
        }
    }
]

describe("ssr mapper tests", () => {
    it("to_folders return an array of objects", () => {
        const test: Array<FolderMap> = staticConf.ssrGke.folderMap
        expect(test.length).toBe(10)
    })
    it("in_files return an array of objects and cloud should be default", () => {
        const test: Array<BuildReplaceInput> = gkeSsr.inFiles({ projectName: projName, businessObj: biz, scmObj: sourceControl, cloudObj: cloud, terraformObj: terraform, networkObj: network})
        expect(test).toStrictEqual(files)
    })
})
