/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { finalResponseMessage, finalErrorMessage } from '../../../../domain/config/worker_maps/shared'
import { shared } from '../../../../domain/config/worker_maps'
import { SourceControlSection, CloudSection, BusinessSection, TerraformSection, NetworkingSection } from '../../../../domain/model/prompt_answer'
import { BuildReplaceInput } from '../../../../domain/config/file_mapper'

const testProjectName = "test-app-1"
const sampleMessage = "All Successful"
const sampleErrorMessage = "All UNSuccessful"

const biz: BusinessSection = <BusinessSection>{
    company: "test",
    project: "test2",
    component: "test3",
    domain: "domain"
}

const cloud: CloudSection = <CloudSection>{
    region: "uksouth",
    resourceGroup: "my-rg"
}

const scmObj: SourceControlSection = <SourceControlSection>{
    repoType: "github",
    repoName: "A-RB"
}

const networkObj: NetworkingSection = <NetworkingSection>{
    baseDomain: "app.replace.me"
}

const terraformObj: TerraformSection = <TerraformSection>{
    backendStorage: "foo",
    backendStorageContainer: "container",
    backendStorageRg: "tg"
}

const files: Array<BuildReplaceInput> = [
    {
        files: ["**/*.md", "**/*.properties"],
        values: {
            "project_name": testProjectName
        }
    },
    {
        files: ["**/*-pipeline.yml"],
        values: {
            "stacks-webapp-template/packages/scaffolding-cli/templates": scmObj.repoName,
            "packages/scaffolding-cli/templates/": "",
            "self_repo_tf_src: deploy/azure/infra/stacks-aks": "self_repo_tf_src: deploy/azure/infra",
            "company: amido": `company: ${biz.company}`,
            "project: stacks": `project: ${biz.project}`,
            "nonprod.amidostacks.internal": "REPLACE_ME_FOR_INTERNAL_DOMAIN",
            "amido-stacks-infra-credentials-nonprod": "REPLACE_ME_FOR_INFRA_SPECIFIC_LIBRARY_VARIABLES",
            "tf_state_storage: amidostackstfstategbl": `tf_state_storage: ${terraformObj.backendStorage}`,
            "tf_state_rg: amido-stacks-rg-uks": `tf_state_rg: ${terraformObj.backendStorageRg}`,
            "tf_state_container: tfstate": `tf_state_container: ${terraformObj?.backendStorageContainer}`,
            "tf_state_key: sharedservices": `tf_state_key: %REPLACE_ME_FOR_STATE_KEY_FOR_SHARED_SERVICES%`,
            "terraform_state_workspace: nonprod": "terraform_state_workspace: %REPLACE_ME_FOR_WORKSPACE_NAME_IN_EACH_STAGE%",
        }
    }
]

describe("shared worker_maps tests", () => {
   it("finalResponseMessage should return a formatted string", () => {
        const test: string = finalResponseMessage(testProjectName, sampleMessage)
        expect(test).toMatch("All Successful")
    })
    it("finalResponseMessage should return a formatted string with config description", () => {
        const test: string = finalResponseMessage(testProjectName, sampleMessage)
        expect(test).toMatch("Next steps: check out your")
    })
    it("final_error_message should return a formatted string", () => {
        const test: string = finalErrorMessage(sampleErrorMessage)
        expect(test).toMatch("All UNSuccessful")
    })
    it("finalResponseMessage should return a formatted string with a code", () => {
        const test: string = finalErrorMessage(sampleErrorMessage, -12)
        expect(test).toMatch(sampleErrorMessage)
        expect(test).toMatch("code:")
    })
    it("in_files return an array of objects and cloud should be default", () => {
        const test: Array<BuildReplaceInput> = shared.inFiles({ projectName: testProjectName, businessObj: biz, terraformObj, scmObj, networkObj})
        expect(test).toStrictEqual(files)
    })
    
})
