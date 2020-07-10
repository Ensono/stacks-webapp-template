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
    },
    {
        files: ["**/api-pipeline.yml"],
        values: {
            "self_repo_tf_src: deploy/azure/app/kube":
                "self_repo_tf_src: deploy/azure/app",
            "amido-stacks-nonprod-demo": "%REPLACE_ME_FOR_VALID_RESOURCE_NAME%",
            "company: amido": `company: ${biz.company}`,
            "project: stacks": `project: ${biz.project}`,
            "domain: api": `domain: ${biz.domain}`,
            "amido-stacks-demo-infra":
                "REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES",
            "amido-stacks-demo-api":
                "REPLACE_ME_FOR_APP_SPECIFIC_LIBRARY_VARIABLES",
            "nonprod.amidostacks.com": `${network.baseDomain}`
        }
    }
]

describe("netcore mapper tests", () => {
    it("netcore config should return an array of folders to map", () => {
        const test: Array<FolderMap> = staticConf.netcore.folderMap
        expect(test.length).toBe(9)
    })
    it("in_files return an array of objects and cloud should be default", () => {
        const test: Array<BuildReplaceInput> = netcore.inFiles({ projectName: projectName, businessObj: biz, terraformObj: tfObj, scmObj: sourceObj, cloudObj: cloud, networkObj: network})
        expect(test).toStrictEqual(files)
    })
})
