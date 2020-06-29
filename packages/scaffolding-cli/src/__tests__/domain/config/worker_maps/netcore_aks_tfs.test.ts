import { BuildReplaceInput } from "../../../../domain/config/file_mapper"
import { BusinessSection, CloudSection, TerraformSection } from "../../../../domain/model/prompt_answer"
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

const tfObj = {
    backendStorageRg: "foo",
    backendStorageContainer: "bar"
} as TerraformSection

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
            "tf_state_storage: amidostackstfstategbl": `tf_state_storage: %REPLACE_ME_FOR_BLOB_STORAGE_ACCOUNT%`,
            "tf_state_rg: amido-stacks-rg-uks": `tf_state_rg: ${tfObj?.backendStorageRg}`,
            "tf_state_container: tfstate": `tf_state_container: ${tfObj?.backendStorageContainer}`,
        }
    }
]

describe("netcore mapper tests", () => {
    it("netcore config should return an array of folders to map", () => {
        const test: Array<FolderMap> = staticConf.netcore.folderMap
        expect(test.length).toBe(10)
    }),
    it("in_files return an array of objects and cloud should be default", () => {
        const test: Array<BuildReplaceInput> = netcore.inFiles({ projectName: projectName, businessObj: biz, terraformObj: tfObj})
        expect(test).toStrictEqual(files)
    })
})
