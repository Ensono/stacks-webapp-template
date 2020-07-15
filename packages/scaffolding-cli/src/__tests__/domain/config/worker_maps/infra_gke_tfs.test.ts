/* eslint-disable no-unused-expressions */
import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection, NetworkingSection, SourceControlSection, TerraformSection } from "../../../../domain/model/prompt_answer"
import { infraGke } from '../../../../domain/config/worker_maps'
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

const scm = {
    repoName: "test"
} as SourceControlSection

const cloud = {
    region: "uksouth",
    resourceGroup: "my-rg"
} as CloudSection

const terraform = {
    backendStorage: "azureBlob"
} as TerraformSection

const files: Array<BuildReplaceInput> = [
    {
        files: ["**/infra-pipeline.yml"],
        values: {
            "domain: gke-infra": `domain: ${biz.domain}`,
            "component: infra": `domain: ${biz.component}`,
            "tf_state_key: gke-infra": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_MY_APP%`,
            "self_repo_tf_src: deploy/gcp/infra/stacks-gke": "self_repo_tf_src: deploy/gcp/infra",
            "docker_container_registry_name: amidostacksnonproduksnode": "docker_container_registry_name: REPLACE_ME_FOR_CONTAINER_REGISTRY",
            "gke.nonprod.amidostacks.com": `${network.baseDomain}`,
            "gcp_region: europe-west2": "gcp_region: %REPLACE_ME_FOR_REGION%",
            "gcp_project_name: amido-stacks": "gcp_project_name: %REPLACE_ME_FOR_PROJECT%"
        }
    }
]

describe("infraGke mapper tests", () => {
    it("to_folders return an array of objects", () => {
        const test: Array<FolderMap> = staticConf.gkeInfra.folderMap
        expect(test.length).toBe(7)
    })
    it("in_files return an array of objects and cloud should be default", () => {
        const test: Array<BuildReplaceInput> = infraGke.inFiles({ projectName: projName, businessObj: biz,scmObj: scm, cloudObj: cloud, terraformObj: terraform, networkObj: network})
        expect(test).toStrictEqual(files)
    })
})
