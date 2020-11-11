import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection, TerraformSection, NetworkingSection, SourceControlSection } from "../../../../domain/model/prompt_answer"
import { netcore } from '../../../../domain/config/worker_maps'
import conf from  '../../../../domain/config/static.config.json'
import { Static, FolderMap } from '../../../../domain/model/config';

const staticConf: Static = conf as Static;

const projectName = "test-app-1"
const biz: BusinessSection = {
    company: "Test",
    project: "Testproj",
    component: "Test3",
    domain: "Domain"
}

const network = {
    baseDomain: "test.me.com"
} as NetworkingSection

const tfObj = {
    backendStorageRg: "foo",
    backendStorage: "azureBlob",
    backendStorageContainer: "bar"
} as TerraformSection

const cloud = {
    region: "uksouth",
    resourceGroup: "my-rg"
} as CloudSection

const sourceObj = {
    repoName: "foo"
} as SourceControlSection

const files: Array<BuildReplaceInput> = [
    {
        files: ["**/*.cs", "**/*.sln", "**/Dockerfile", "**/*.csproj"],
        values: {
            "xxAMIDOxx": biz.company || "Company",
            "xxSTACKSxx": biz.project || "Project",
        }
    },
    {
        files: ["**/api-pipeline.yml"],
        values: {
            "company: amido": `company: ${biz.company}`,
            "project: stacks": `project: ${biz.project}`,
            "domain: netcore-api": `domain: ${biz.domain}`,
            "self_repo: stacks-dotnet": `self_repo: "${sourceObj.repoName}"`,
            "self_repo_tf_src: deploy/azure/app/kube":
                "self_repo_tf_src: deploy/azure/app",
            "self_generic_name: stacks-api": "self_generic_name: $(project)-$(domain)",
            "northeurope": cloud.region,
            "amidostacksnonprodeuncore": "%REPLACE_ME_FOR_CONTAINER_REGISTRY_NAME%",
            "TF_VAR_app_insights_name: \"amido-stacks-nonprod-eun-core\"": "TF_VAR_app_insights_name: %REPLACE_ME_FOR_APP_INSIGHTS_NAME%",
            "TF_VAR_app_gateway_frontend_ip_name: \"amido-stacks-nonprod-eun-core\"": "TF_VAR_app_gateway_frontend_ip_name: %REPLACE_ME_FOR_APP_GATEWAY_IP_NAME%",
            "kubernetes_clustername: amido-stacks-nonprod-eun-core": "kubernetes_clustername: %REPLACE_ME_FOR_AKS_CLUSTER_NAME%",
            "amido-stacks-nonprod-eun-core": "%REPLACE_ME_FOR_CORE_RESOURCE_GROUP%",
            "TF_VAR_dns_record: dev-netcore-api": "TF_VAR_dns_record: dev-$(domain)",
            "namespace: dev-netcore-api": "namespace: dev-$(domain)",
            "app_name: yumido-netcore-api": "app_name: $(domain)",
            "resource_def_name: yumido-netcore-api": "resource_def_name: $(project)-$(domain)",
            "dns_pointer: dev-netcore-api": "dns_pointer: dev-$(domain)",
            "tf_state_key: netcore-api": `tf_state_key: "${biz.project}-${biz.domain}"`,
            "amido-stacks-demo-infra":
                "%REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES%",
            "amido-stacks-webapp":
                "%REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES%",
            "nonprod.amidostacks.com": `${network.baseDomain}`
        }
    }
]

describe("netcore mapper tests", () => {
    it("netcore config should return an array of folders to map", () => {
        const test: Array<FolderMap> = staticConf.netcore.folderMap
        expect(test.length).toBe(8)
    })
    it("in_files return an array of objects and cloud should be default", () => {
        const test: Array<BuildReplaceInput> = netcore.inFiles({ projectName, businessObj: biz, terraformObj: tfObj, scmObj: sourceObj, cloudObj: cloud, networkObj: network})
        expect(test).toStrictEqual(files)
    })
})
